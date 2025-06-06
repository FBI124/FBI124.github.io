import logging
import random
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

logging.basicConfig(level=logging.INFO)


model_name = "sberbank-ai/rugpt3small_based_on_gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

def generate_text(prompt, max_length=80):
    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)
    output = model.generate(
        input_ids,
        max_length=max_length,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.9,
        num_return_sequences=1,
    )
    result = tokenizer.decode(output[0], skip_special_tokens=True)
    return result[len(prompt):].strip()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Привет! Я бот, который может генерировать вопросы и ответы по теме хобби в рамках лабораторной работы №8.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_text = update.message.text

    prompt_question = "Придумай интересный вопрос по теме хобби:\nВопрос:"
    question = generate_text(prompt_question)

    prompt_answer = f"Ответ на вопрос по хобби: {question}\nОтвет:"
    answer = generate_text(prompt_answer)

    reply = f"❓ *{question}*\n💬 {answer}"
    await update.message.reply_text(reply, parse_mode="Markdown")

async def main():
    app = ApplicationBuilder().token("7723024613:AAFDW6LJr4LAMO3jcGVXrhhTKT2lkGTv7p8").build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("Бот работает...")
    await app.run_polling()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
