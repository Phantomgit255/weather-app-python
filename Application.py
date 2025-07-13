from flask import Flask, render_template, request
from maincode import main as get_weather

app = Flask(__name__)

@app.route('/',methods=['GET', 'POST'])
def index():
 data=None
 if request.method == 'POST':
     city = request.form.get('city_name')
     state = request.form.get('state_name')
     country = request.form.get('country_name')
     if city and state and country:
      data = get_weather(city, state, country)
     else:
        data={'Error':'Enter all the fields.'}
 return render_template('Website.html',data=data)

if __name__ == '__main__':
    app.run(debug=True)
