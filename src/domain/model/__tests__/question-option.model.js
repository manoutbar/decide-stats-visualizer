import QuestionOption from "../question-option.model";

const createQuestionOption = (...args) => {
    const attrs = ['number', 'option'];
    return new QuestionOption(Object.fromEntries(attrs.map((attr,i) => {
        return [attr, args[i]];
    })))
}

const DEFAULT_DATA = {
    number: 1,
    option: 'Opcion de la question'
}

describe('Question-option model test', () => {

    test('creates a valid instance', () =>{
        const [number, option] = [DEFAULT_DATA.number, DEFAULT_DATA.option];
        const instance = createQuestionOption(number,option);

        expect(instance).toBeInstanceOf(QuestionOption);
        expect(instance.number).toBe(number);
        expect(instance.option).toEqual(option);
        
    });
})