import Grammar from "./js/grammar.js";

document.getElementById('generate-btn').addEventListener('click', generateSentenceFromInput);

function gerarGramatica(input) {
  let productions = {};
  let nonTerminals = new Set();
  let terminals = new Set();
  let productionRules = input.split(";");
      
  productionRules.forEach(rule => {
    let parts = rule.split("::=");
    let nonTerminal = parts[0].trim();
    nonTerminals.add(nonTerminal);
  });

  productionRules.forEach(rule => {
    let parts = rule.split("::=");
    let nonTerminal = parts[0].trim();

    let rules = parts[1].split("|").map(r => r.trim());
    productions[nonTerminal] = rules;

    rules.forEach(rule => {
      for (let symbol of rule) {
        if (!nonTerminals.has(symbol)) {  
          terminals.add(symbol);
        }
      }
    });
  });

  return { nonTerminals: [...nonTerminals], terminals: [...terminals], productions };
}

function generateSentenceFromInput() {
  const startSymbol = document.getElementById('start-symbol').value.trim().toUpperCase();
  const inputProductions = document.getElementById('grammar-selection').value.trim();

  const { nonTerminals, productions, terminals } = gerarGramatica(inputProductions);

  if (!nonTerminals.includes(startSymbol)) {
    document.getElementById('result').innerHTML = `<span class="error">Erro: O símbolo "${startSymbol}" não está definido nas regras da gramática.</span>`;
    return;
  }

  const grammar = new Grammar(nonTerminals, terminals, productions, startSymbol);
  const result = Grammar.deriveSentence(grammar);
  document.getElementById('result').textContent = `Sentença gerada: ${result}`;
}



