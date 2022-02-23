const game_preset_model = require('../models/game_preset_model.js');
const {InternalErrorHandler} = require('../modules/error_handler/error_handler.js');

const MIN_EXPRESSION_DIFFICULTY = 1;
const MAX_EXPRESSION_DIFFICULTY = 3;

class GameService
{
  async getGamePresets(){
    try{
      return await game_preset_model.find({}, '-__v');
    }
    catch(err){
      console.log(err);
      throw new InternalErrorHandler();
    };
  }

  async getGamePresetById(preset_id){
    try{
      return await game_preset_model.findById(preset_id, '-__v');
    }
    catch(err){
      console.log(err);
      return new InternalErrorHandler();
    }
  }

  generateMaxNumber(difficulty) {
    const diff = Math.max(Math.min(difficulty, MAX_EXPRESSION_DIFFICULTY), MIN_EXPRESSION_DIFFICULTY);   
    let max = 0;
 
    for(let i = 0; i < diff; i++){
      max += 9 * Math.pow(10, i);    
    }
    return max;
  }

  // in range [min, max]
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }
  
  translationModeToMathExpression(mode){
    const expr_ceil = this.generateMaxNumber(mode.difficulty);
    let a = this.getRandomInt(0, expr_ceil);
    let b = this.getRandomInt(0, expr_ceil);
    
    let answer = null;
    let expression_str = null;

    switch(mode.name){
      case "add":
        answer = a + b;
        expression_str = `${a} + ${b}`;
        break;
      case "subtract":
        answer = a - b;
        expression_str = `${a} - ${b}`;
        break;
      case "multiply":
        answer = a * b;
        expression_str = `${a} * ${b}`;
        break;
      case "division":
        while(1)
          if(b == 0) b = this.getRandomInt(0, expr_ceil);
          else break;
        answer = a * b;
        expression_str = `${answer} / ${b}`;
        return {expression: expression_str, answer: a};
      default:
        answer = a + b;
        expression_str = `${a} + ${b}`;
        break;
    }

    return {expression: expression_str, answer: answer};
  }
}

module.exports = new GameService();