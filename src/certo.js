class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: { macacos: 3 } },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: {} },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { gazelas: 1 } },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: {} },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: { leoes: 1 } },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, bioma: 'savana', tipo: 'carnivoro' },
        LEOPARDO: { tamanho: 2, bioma: 'savana', tipo: 'carnivoro' },
        CROCODILO: { tamanho: 3, bioma: 'rio', tipo: 'carnivoro' },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], tipo: 'herbivoro' },
        GAZELA: { tamanho: 2, bioma: 'savana', tipo: 'herbivoro' },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], tipo: 'herbivoro' },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      // Validação da entrada
      if (!this.animais[animal.toUpperCase()]) {
        return { erro: 'Animal inválido' };
      }
      if (typeof quantidade !== 'number' || quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida' };
      }
  
      const infoAnimal = this.animais[animal.toUpperCase()];
      const recintosViaveis = [];
  
      this.recintos.forEach(recinto => {
        const biomaAdequado = Array.isArray(infoAnimal.bioma) ? infoAnimal.bioma.includes(recinto.bioma) : recinto.bioma === infoAnimal.bioma;
  
        if (!biomaAdequado) return;
  
        const espacoOcupadoNovosAnimais = quantidade * infoAnimal.tamanho + (quantidade - 1);
        const espacoOcupadoAtual = this.calculaEspacoOcupado(recinto);
        const espacoLivreAtual = recinto.tamanho - espacoOcupadoAtual - espacoOcupadoNovosAnimais;
  
        if (espacoLivreAtual < 0) return;
  
        if (infoAnimal.tipo === 'carnivoro') {
          const jaTemCarnivoro = Object.keys(recinto.animais).some(animalExistente =>
            this.animais[animalExistente.toUpperCase()]?.tipo === 'carnivoro'
          );
          if (jaTemCarnivoro) return;
        } else if (espacoLivreAtual < quantidade * infoAnimal.tamanho) {
          return;
        }
  
        if (animal.toUpperCase() === 'MACACO' && quantidade === 1 && Object.keys(recinto.animais).length === 0) {
          return;
        }
  
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivreAtual} total: ${recinto.tamanho})`);
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis: recintosViaveis.sort() };
    }
  
    calculaEspacoOcupado(recinto) {
      let espacoOcupado = 0;
      for (const [animalExistente, quantidade] of Object.entries(recinto.animais)) {
        const nomeSingular = animalExistente.slice(0, -1).toUpperCase();
        const info = this.animais[nomeSingular];
        if (!info) {
          console.error(`Informações do animal ${animalExistente} não encontradas.`);
          continue;
        }
        espacoOcupado += info.tamanho * quantidade; 
      }
      return espacoOcupado;
    
  
    }
    
  }
  
  export { RecintosZoo };
  