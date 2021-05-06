import React from 'react';
import '../../../App.css';
import { Button } from './../../assets/Button/Button';
import './HeroComponent.css';
import $ from 'jquery';
import "./../LendACar/LendCar.css"
import SearchBar from './SearchBar';
import { SubmitButton } from '../../../styles/style';
import AuthService from "../../../services/auth";
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

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

				{/* <Modal visible={this.state.visible} width="700" height="40%" effect="fadeInUp" onClickAway={() => this.hideModal()}>
					<div className="container">
						<SearchBar />
						<div className="buttonContainer">
							{' '}
							<SubmitButton>
								Search for cars
							</SubmitButton>
						</div>
					</div>
				</Modal> */}
				<Dialog open={this.state.visible} aria-labelledby="form-dialog-title" fullWidth="true" maxWidth="xs" >
					<DialogContent>
						<SearchBar />
					</DialogContent>
					<div className="buttonContainer">
						<SubmitButton style={{padding:"2%", marginRight:"5%"}}>
							Search for cars
						</SubmitButton>
						<SubmitButton style={{padding:"2%", marginLeft:"5%"}}>
							Cancel Search
						</SubmitButton>
					</div>
					{/* <DialogActions>
						<Button> ok </Button>
					</DialogActions> */}
				</Dialog>

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

					{
						!(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)
							?
							<Button
								className='btns'
								buttonStyle='btn--primary'
								buttonSize='btn--large'
								link="/user/signin"
							>
								LEND YOUR CAR <i className='far fa-play-circle' />
							</Button>
							:
							<Button
								className='btns'
								buttonStyle='btn--primary'
								buttonSize='btn--large'
								link="/user/lendCar"
							>
								LEND YOUR CAR <i className='far fa-play-circle' />
							</Button>
					}
				</div>
			</div>
		);
	}
}

export default React.memo(HeroComponent);
