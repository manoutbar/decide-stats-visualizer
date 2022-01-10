import Question from '../question.model';

const createQuestion = (...args) => {
    const attrs = [ 'desc', 'options'];
    return new Question(Object.fromEntries(attrs.map((attr, i) => {
      return [attr, args[i]];
    })));
}

const DEFAULT_DATA = {
    desc: 'description',
    options: [{ number:1 ,option:'This is option 1'},{ number:2, option:'This is option 2'}]

}



describe('Question model tests', () => {

    test('creates a valid instance', () =>{
        const [desc, options] = [DEFAULT_DATA.desc, DEFAULT_DATA.options];
        const instance = createQuestion(desc,options);

        expect(instance).toBeInstanceOf(Question);
        expect(instance.desc).toBe(desc);
        expect(instance.options).toEqual(options);
        
    });
})