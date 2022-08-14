import { Component, OnInit } from '@angular/core';
import { DataCrawlerService } from '../data-crawler.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemon: any[] = []
  selectedPokemon: any[] = []; selectedPokemon2: any[] = []
  selectedPokemonName: any; selectedPokemonName2: any; 
  selectedPokemonScore = 0; selectedPokemonScore2 = 0
  page = 1
  pokemonCount: number | undefined
  winner: any

  constructor(private crawler: DataCrawlerService) { }

  ngOnInit(): void {
    this.getPokemon()
  }

  getPokemon(){
    this.crawler.getPokedex(48, this.page * 48 - 48).subscribe((res: any) => {
      this.pokemonCount = res.count
      res.results.forEach((element: { name: string; }) => {
        this.crawler.getPokemonDetails(element.name).subscribe((uniqres: any) => {
          uniqres.name = uniqres.name.charAt(0).toUpperCase() + uniqres.name.slice(1);
          this.pokemon.push(uniqres)
          this.pokemon = this.pokemon.sort((a, b) => a.id - b.id)
        })
      });
    })
  }

  select(i: any){
    this.crawler.getPokemonDetails(i.name).subscribe((uniqres: any) => {
        this.selectedPokemon.pop()
        uniqres.name = uniqres.name.charAt(0).toUpperCase() + uniqres.name.slice(1);
        this.selectedPokemon.push(uniqres)
        this.selectedPokemonScore = uniqres.stats[0].base_stat + uniqres.stats[1].base_stat + uniqres.stats[2].base_stat + 
                                    uniqres.stats[3].base_stat + uniqres.stats[4].base_stat + uniqres.stats[5].base_stat
        this.selectedPokemonName = uniqres.name
    })
  }

  select2(i: any){
    this.crawler.getPokemonDetails(i.name).subscribe((uniqres: any) => {
        this.selectedPokemon2.pop()
        uniqres.name = uniqres.name.charAt(0).toUpperCase() + uniqres.name.slice(1);
        this.selectedPokemon2.push(uniqres)
        this.selectedPokemonScore2 = uniqres.stats[0].base_stat + uniqres.stats[1].base_stat + uniqres.stats[2].base_stat + 
                                    uniqres.stats[3].base_stat + uniqres.stats[4].base_stat + uniqres.stats[5].base_stat
        this.selectedPokemonName2 = uniqres.name                            
    })
  }

  compareStats(){
    if(this.selectedPokemonScore == 0 || this.selectedPokemonScore2 == 0)
      this.winner = "Please choose 2 Pokemon!"
    else if(this.selectedPokemonScore > this.selectedPokemonScore2)
      this.winner = this.selectedPokemonName + " wins!"
    else if(this.selectedPokemonScore2 > this.selectedPokemonScore)
      this.winner = this.selectedPokemonName2 + " wins!"
    else
      this.winner = "Tie"
  }

  checkColor(type: any){
    if (type == "bug")
      return '#30C1A9'
    else if (type == "dark")
      return '#424F4A'
    else if (type == "dragon")
      return '#57DBD7'
    else if (type == "electric")
      return '#EBF53C'
    else if (type == "fairy")
      return '#F064CB'
    else if (type == "fighting")
      return '#EE8B29'
    else if (type == "fire")
      return '#FC4F4F'
    else if (type == "flying")
      return '#C1B0B0'
    else if (type == "ghost")
      return '#34195A'
    else if (type == "grass")
      return '#31A215'
    else if (type == "ground")
      return '#A27415'
    else if (type == "ice")
      return '#19DFDD'
    else if (type == "normal")
      return '#B8B8B8'
    else if (type == "poison")
      return '#AC2CD0'
    else if (type == "psychic")
      return '#D736CB'
    else if (type == "rock")
      return '#623C0D'
    else if (type == "steel")
      return '#787878'
    else if (type == "water")
      return '#595EE2'
    else
      return 'white'
  }

}
