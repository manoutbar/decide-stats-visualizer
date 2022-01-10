import QuestionOption from "./question-option.model";

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
}