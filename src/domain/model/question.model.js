import QuestionOption from "./question-option.model";
<<<<<<< HEAD


export default class Question {

  
  constructor({ desc,options}) {
    this.desc = desc;

    this.options = [];

    if (options instanceof Array){
      options.forEach(option => {
          this.options.push(new QuestionOption(option))
        });
    }


    console.log('options', options);
   
  
  }

  

=======

export default class Question {

  constructor({ desc,options}) {
    this.desc = desc;
    this.options = [];

    if (options instanceof Array){
      options.forEach(option => {
          this.options.push(new QuestionOption(option))
        });
    }
  }
>>>>>>> 398b0180daff584ff04860149138fbc2e04a0c0b
}