import React from 'react';
import '../../../App.css';
import { Button } from './../../assets/Button';
import './HeroComponent.css';
import $ from 'jquery';

class HeroComponent extends React.Component {

	
	componentDidMount() {
		this.numberDisplay();
		this.typewritter();
	}

	numberDisplay = () => {
		var $randomnbr = $('.nbr');
		var $timer = 10;
		var $it;
		var $data = 0;
		var index;
		var change;
		var letters = ["W", "H", "A", "T", " ", "A", "R", "E", " ", "Y", "O", "U", " ", "W", "A", "I", "T", "I", "N", "G", " ", "F", "O", "R", "?"];

		$randomnbr.each(function () {

			change = Math.round(Math.random() * 100);
			$(this).attr('data-change', change);

		});

		function random() {
			return Math.round(Math.random() * 9);
		};

		function select() {
			return Math.round(Math.random() * $randomnbr.length + 1);
		};

		function value() {
			$('.nbr:nth-child(' + select() + ')').html('' + random() + '');
			$('.nbr:nth-child(' + select() + ')').attr('data-number', $data);
			$data++;

			$randomnbr.each(function () {
				if (parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))) {
					index = $('.ltr').index(this);
					$(this).html(letters[index]);
					$(this).removeClass('nbr');
				}
			});

		};

		$it = setInterval(value, $timer);
	}

	typewritter = () => {
		var TxtType = function (el, toRotate, period) {
			this.toRotate = toRotate;
			this.el = el;
			this.loopNum = 0;
			this.period = parseInt(period, 10) || 2000;
			this.txt = '';
			this.tick();
			this.isDeleting = false;
		};

		TxtType.prototype.tick = function () {
			var i = this.loopNum % this.toRotate.length;
			var fullTxt = this.toRotate[i];

			if (this.isDeleting) {
				this.txt = fullTxt.substring(0, this.txt.length - 1);
			} else {
				this.txt = fullTxt.substring(0, this.txt.length + 1);
			}

			this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

			var that = this;
			var delta = 200 - Math.random() * 100;

			if (this.isDeleting) { delta /= 2; }

			if (!this.isDeleting && this.txt === fullTxt) {
				delta = this.period;
				this.isDeleting = true;
			} else if (this.isDeleting && this.txt === '') {
				this.isDeleting = false;
				this.loopNum++;
				delta = 500;
			}

			setTimeout(function () {
				that.tick();
			}, delta);
		};

		var elements = document.getElementsByClassName('typewrite');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		document.body.appendChild(css);
	}

	render() {
		return (
			<div className='hero-container'>
				<video src='/videos/ff2.mp4' autoPlay loop muted />
				{/* <h1>HIT THE ROAD CONFIDENTLY</h1> */}
				<h1 class="typewrite" data-period="2000" data-type='[ "HIT THE ROAD CONFIDENTLY" ]'>
					<span class="wrap"></span>
				</h1>

				<div className="content">
					<div className="random">
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
						<span className="nbr ltr">0</span>
					</div>
				</div>
				{/* <p>What are you waiting for?</p> */}
				<div className='hero-btns'>
					<Button
						className='btns'
						buttonStyle='btn--outline'
						buttonSize='btn--large'
					>
						RENT A CAR
          </Button>
					<Button
						className='btns'
						buttonStyle='btn--primary'
						buttonSize='btn--large'
						onClick={ () => console.log('hey')}
					>
						LEND YOUR CAR <i className='far fa-play-circle' />
					</Button>
				</div>
			</div>
		);
	}
}

export default HeroComponent;
