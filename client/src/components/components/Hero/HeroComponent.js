import React from 'react';
import '../../../App.css';
import { Button } from './../../assets/Button/Button';
import './HeroComponent.css';
import $ from 'jquery';
import Modal from 'react-awesome-modal'

class HeroComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			visible: false
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal = () => {
		this.setState({ visible: true });
	};

	hideModal = () => {
		this.setState({ visible: false });
	};

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
				<h1 className="typewrite" data-period="2000" data-type='[ "HIT THE ROAD CONFIDENTLY" ]'>
					<span className="wrap"></span>
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

				<Modal visible={this.state.visible} width="600" height="450" effect="fadeInUp" onClickAway={() => this.hideModal()}>
					<div className="modal-container">
						<div className="modal-header">
							<h1>Car Rental</h1>
							<p>Safe Car Rentals in India</p>
							<a href="javascript:void(0);" onClick={() => this.hideModal()}>Close</a>
							<hr />
						</div>
						<div className="modal-content">
							<form className="CarSearchForm" action="">
								<label htmlFor="city">Choose a city:</label>
								<select name="city" id="city">
									<option value="ahmedabab">Ahmedabad</option>
									<option value="bengaluru">Bengaluru</option>
									<option value="chennai">Chennai</option>
									<option value="delhi">Delhi</option>
								</select>
								<br />
								<label htmlFor="start-time">Select a starting time:</label>
								<input type="time" id="start-time" name="start-time" />
								<br />
								<label htmlFor="end-time">Select a ending time:</label>
								<input type="time" id="end-time" name="end-time" />
								<br />
								<button type="submit" onClick="">Search Cars</button>
							</form>
						</div>
					</div>
				</Modal>

				<div className='hero-btns'>
					<Button
						className='btns'
						buttonStyle='btn--outline'
						buttonSize='btn--large'
						// TODO : first redirect to link and then open the modal
						onClick={this.showModal}
					>
						RENT A CAR
          			</Button>

					<Button
						className='btns'
						buttonStyle='btn--primary'
						buttonSize='btn--large'
						link="/user/lendCar"
					>
						LEND YOUR CAR <i className='far fa-play-circle' />
					</Button>
				</div>
			</div>
		);
	}
}

export default React.memo(HeroComponent);
