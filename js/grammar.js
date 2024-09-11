export default class Grammar {
    constructor(naoTerminais, terminais, producoes, simboloInicial) {
        this.naoTerminais = new Set(naoTerminais);
        this.terminais = new Set(terminais);
        this.producoes = producoes; 
        this.simboloInicial = simboloInicial;
    }

    derivarSentenca() {
        let pilha = [];
        let saida = '';

        pilha.push(this.simboloInicial);

        while (pilha.length > 0) {
            let topo = pilha.pop(); 

            if (this.terminais.has(topo)) {
                saida += topo;
            } else if (this.naoTerminais.has(topo)) {
                let producoes = this.producoes[topo];
                if (!producoes) continue;
                
                let producaoAleatoria = producoes[Math.floor(Math.random() * producoes.length)];
                if (producaoAleatoria === 'e') {
                    continue; 
                }

               
                for (let i = producaoAleatoria.length - 1; i >= 0; i--) {
                    pilha.push(producaoAleatoria[i]);
                }
            }
        }

        return saida;
    } 
}
