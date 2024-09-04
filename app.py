from flask import Flask, render_template, request, redirect, url_for
import sqlite3
from datetime import datetime

app = Flask(__name__)


# Función para conectar a la base de datos
def get_db_connection():
    conn = sqlite3.connect('data/transactions.db')
    conn.row_factory = sqlite3.Row
    return conn


# Ruta principal
@app.route('/', methods=['GET', 'POST'])
def index():
    conn = get_db_connection()

    # Saldo inicial
    initial_balance = 250000.0

    if request.method == 'POST':
        amount = float(request.form['amount'])
        transaction_type = request.form['transaction_type']
        category = request.form['category']
        subcategory = request.form['subcategory']
        description = request.form['description']
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Ajuste del saldo según el tipo de transacción
        if transaction_type == 'Egreso':
            amount = -abs(amount)
        else:
            amount = abs(amount)

        conn.execute(
            'INSERT INTO transactions (amount, transaction_type, category, subcategory, description, date) VALUES (?, ?, ?, ?, ?, ?)',
            (amount, transaction_type, category, subcategory, description, date))
        conn.commit()
        return redirect(url_for('index'))

    transactions = conn.execute('SELECT * FROM transactions ORDER BY date DESC').fetchall()
    balance = initial_balance + sum([t['amount'] for t in transactions])
    conn.close()
    return render_template('index.html', transactions=transactions, balance=balance, datetime=datetime)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
