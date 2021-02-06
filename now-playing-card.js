class NowPlayingPoster extends HTMLElement {
	set hass(hass) {
		if (!this.content) {
			const card = document.createElement('ha-card');
			this.content = document.createElement('div');
			card.appendChild(this.content);
			card.style = "background: none;";
			this.appendChild(card);
		}

		const offposter = this.config.off_image;
		const entityId = this.config.entity;
		const state = hass.states[entityId];
		const stateStr = state ? state.state : 'unavailable';

		if (state) {

			const moviePoster = state.attributes.entity_picture;

			if (["playing", "on"].indexOf(stateStr) > -1 && moviePoster) {	// Poster is available
				this.content.innerHTML = `
				<!-- now playing card ${entityId}  -->
				<img src="${moviePoster}" width=100% height=100%">
				`;
			}
			else	// Poster is unavailable
			{
				if (offposter) {	// Using idle screen
					this.content.innerHTML = `
					<!-- now playing card ${entityId} -->
					<img src="${offposter}" width=100% align="center" style="">
					`;
				}
				else
				{
					this.content.innerHTML = `
					<!-- now playing card ${entityId} no image-->
					`;
				}

			}
		}
		else
		{
			this.content.innerHTML = `
			<!-- now playing card ${entityId} not playing -->
			`;
		}
	}

	setConfig(config) {
		if (!config.entity) {
			throw new Error('You need to define an entity');
		}
		this.config = config;
	}

	// The height of your card. Home Assistant uses this to automatically
	// distribute all cards over the available columns.
	getCardSize() {
		return 3;
	}
}

customElements.define('now-playing-poster', NowPlayingPoster);