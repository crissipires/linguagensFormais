export default class Gramatica {
    constructor(naoTerminais, terminais, producoes, simboloInicial) {
      this.naoTerminais = new Set(naoTerminais);
      this.terminais = new Set(terminais);
      this.producoes = producoes; 
      this.simboloInicial = simboloInicial;
    }
 
    derivarSentenca(gramatica) {
        let pilha = [];
        let saida = '';
    
        pilha.push(gramatica.simboloInicial);
    
        while (pilha.length > 0) {
            let topo = pilha.pop(); 
        
            if (gramatica.terminais.has(topo)) {
                saida += topo;
            } else if (gramatica.naoTerminais.has(topo)) {
                let producoes = gramatica.producoes[topo];
                let producaoAleatoria = producoes[Math.floor(Math.random() * producoes.length)];

                  // é colocado a produção escolhida na pilha, de trás para frente, isso garante que o símbolo mais à esquerda fique no topo
                for (let i = producaoAleatoria.length - 1; i >= 0; i--) {
                    pilha.push(producaoAleatoria[i]);
                }
            }
        }
    
        return saida;
    } 
}
