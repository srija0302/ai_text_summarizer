const OpenAI = require("openai")

const runPrompt = async(valueText)=>{
    const openai = new OpenAI({apiKey: "API_KEY",dangerouslyAllowBrowser: true}); //replace API_KEY 
    const prompt = `Give the summary for this text: "${valueText}"`
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{"role":"user","content":prompt}],
        max_tokens:1000,
        n:1
    })
    return response.choices[0].message;

}


export default runPrompt;