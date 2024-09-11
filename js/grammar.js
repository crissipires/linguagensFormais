export default class Grammar {
    constructor(nonTerminals, terminals, productions, startSymbol) {
      this.nonTerminals = new Set(nonTerminals);
      this.terminals = new Set(terminals);
      this.productions = productions; 
      this.startSymbol = startSymbol;
    }
 
    static deriveSentence(grammar) {
        let stack = [];
        let output = '';
    
        stack.push(grammar.startSymbol);
    
        while (stack.length > 0) {
            let top = stack.pop(); 
        
            if (grammar.terminals.has(top)) {
                output += top;
            } else if (grammar.nonTerminals.has(top)) {
                let productions = grammar.productions[top];
                let randomProduction = productions[Math.floor(Math.random() * productions.length)];

                  // é colocado a produção escolhida na pilha, de trás para frente, isso garante que o símbolo mais à esquerda fique no topo
                for (let i = randomProduction.length - 1; i >= 0; i--) {
                    stack.push(randomProduction[i]);
                }
            }
        }
    
        return output;
    } 
}
