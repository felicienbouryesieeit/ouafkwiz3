import PokerCard from "./cards/PokerCard";
//import Cardpar from './cards/Cardpar';
import SkillCardPar from "./cards/SkillCardPar";
import Skill_white_sword from "./cards/Skills/Skill_white_sword";

class GameManager {
  poker_deck: PokerCard[] = [];
  poker_hand : PokerCard[] = [];
  skill_hand : SkillCardPar[] = [];
  skill_shop : SkillCardPar[] = [];

  
  constructor() {
    this.poker_deck = [];
    this.poker_hand = [];
  }

  create_poker_deck() {
    this.poker_deck = [];
    for (let i = 1; i < 14; i++) {
      for (let j = 0; j < 4; j++) {
        let card : PokerCard = new PokerCard();
        card.begin_pokercard(i,j);
        this.poker_deck.push(card);
      }
    
  }}

  set_poker_deck(new_deck : PokerCard[]) {
    this.poker_deck = new_deck;
  }

  set_poker_hand(new_hand : PokerCard[]) {
    this.poker_hand = new_hand;
  }

  set_skill_hand(new_hand : SkillCardPar[]) {
    this.skill_hand = new_hand;
  }

  set_skill_shop(new_hand : SkillCardPar[]) {
    this.skill_shop = new_hand;
  }


  create_skill_hand() {
    this.skill_hand = [];
    for(let i =0; i<2;i++) {
      let current_skill = new Skill_white_sword();
      this.skill_hand.push(current_skill);
    }
  }

  create_skill_shop() {
    this.skill_shop = [];
    for(let i =0; i<3;i++) {
      let current_skill = new Skill_white_sword();
      current_skill.is_in_shop = true;
      this.skill_shop.push(current_skill);
    }
  }

  create_poker_hand() {
    this.create_poker_deck();
    this.poker_hand = [];
    for (let i = 0; i < 8; i++) {
    this.draw_random_card();
        
    }
  }

  discard_skill_card(card: SkillCardPar) {
    const index = this.skill_hand.indexOf(card);
    this.skill_hand.splice(index, 1);
  }

  discard_skill_shop_card(card: SkillCardPar) {
    const index = this.skill_shop.indexOf(card);
    this.skill_shop.splice(index, 1);
  }

  discard_poker_card(card: PokerCard) {
    const index = this.poker_hand.indexOf(card);
    this.poker_deck.push(card);
    this.poker_hand.splice(index, 1);
  }

  draw_random_card() {
    let card_index : number = Math.floor(Math.random() * this.poker_deck.length);
    let current_card = this.poker_deck[card_index];
    //current_card.index = this.poker_hand.length;
    //console.log('index : ', current_card.index);
    this.poker_hand.push(current_card);
    this.poker_deck.splice(card_index, 1);
  }

 create_selected_cards_list() {
  let selected_cards : PokerCard[] = [];
    this.poker_hand.forEach(card => {
      if (card.is_selected==true) {
        selected_cards.push(card)
      }
    });
    return selected_cards;
 }
  

  discard_selected_cards() {
    let selected_cards : PokerCard[] = this.create_selected_cards_list();

    let selected_cards_length = selected_cards.length

    for (let i = 0; i < selected_cards_length; i++) {
      this.discard_poker_card(selected_cards[i]);
      //selected_cards.splice(0, 1);
      
    }
  }


}
export default GameManager;