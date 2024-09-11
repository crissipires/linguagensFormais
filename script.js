import Grammar from "./js/grammar.js";

document.getElementById('generate-btn').addEventListener('click', generateSentenceFromInput);

function parseGrammar(input) {
  let productions = {};
  let nonTerminals = new Set();
  let productionRules = input.split(";");
      
  productionRules.forEach(rule => {
    let parts = rule.split("::=");
    let nonTerminal = parts[0].trim();
    nonTerminals.add(nonTerminal);

    let rules = parts[1].split("|").map(r => r.trim());
    productions[nonTerminal] = rules;
  });

  return { nonTerminals: [...nonTerminals], productions };
}

function generateSentenceFromInput() {
  const startSymbol = document.getElementById('start-symbol').value.trim();
  const inputProductions = document.getElementById('grammar-selection').value.trim();

  const { nonTerminals, productions } = parseGrammar(inputProductions);
  const terminals = ['a', 'b']; // Exemplo de terminais

  const grammar = new Grammar(nonTerminals, terminals, productions, startSymbol);
  const result = Grammar.deriveSentence(grammar);
  document.getElementById('result').textContent = `Sentença gerada: ${result}`;
}



