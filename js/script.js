import Grammar from "./grammar.js";

document.getElementById('generate-btn').addEventListener('click', generateSentenceFromInput);

function parseGrammar(input) {
  const parts = input.split("::=");
  const nonTerminal = parts[0].trim();
  const productionRules = parts[1].split("|").map(rule => rule.trim());
  return { nonTerminal, productionRules };
}

function generateSentenceFromInput() {
  const startSymbol = document.getElementById('start-symbol').value.trim();
  const inputProductions = document.getElementById('productions').value.trim();
  const { nonTerminal, productionRules } = parseGrammar(inputProductions);

  const grammar = new Grammar([nonTerminal], ['a', 'b'], { [nonTerminal]: productionRules }, startSymbol);
  const result = Grammar.deriveSentence(grammar);
  document.getElementById('result').textContent = `Sentença gerada: ${result}`;
}



