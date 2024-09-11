import Grammar from "./js/grammar.js";

document.getElementById('generate-btn').addEventListener('click', gerarsentencaInput);

function gerarGramatica(input) {
  let producao = {};
  let naoTerminais = new Set();
  let terminais = new Set();
  let regraProducao = input.split(";");
      
  regraProducao.forEach(regras => {
    let particao = regras.split("::=");
    let naoTerminal = particao[0].trim();
    naoTerminais.add(naoTerminal);
  });

  regraProducao.forEach(regras => {
    let particao = regras.split("::=");
    let naoTerminal = particao[0].trim();

    let regra = particao[1].split("|").map(r => r.trim());
    producao[naoTerminal] = regra;

    regra.forEach(regras => {
      for (let simbolo of regras) {
        if (!naoTerminais.has(simbolo)) {  
          terminais.add(simbolo);
        }
      }
    });
  });

  return { naoTerminais: [...naoTerminais], terminais: [...terminais], producao };
}

function gerarsentencaInput() {
  const simboloInicial = document.getElementById('start-symbol').value.trim().toUpperCase();
  const inputProducoes = document.getElementById('grammar-selection').value.trim();

  const { naoTerminais, producao, terminais } = gerarGramatica(inputProducoes);

  if (!naoTerminais.includes(simboloInicial)) {
    document.getElementById('result').innerHTML = `<span class="error">Erro: O símbolo "${simboloInicial}" não está definido nas regras da gramática.</span>`;
    return;
  }

  const grammar = new Grammar(naoTerminais, terminais, producao, simboloInicial);
  const result = grammar.derivarSentenca(grammar);

  document.getElementById('result').textContent = `Sentença gerada: ${result}`;
}



