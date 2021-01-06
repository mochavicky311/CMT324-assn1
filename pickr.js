var bcolor;
var color1 = [];
var color2 = [];
var color3 = [];
var color4 = [];

const pickr = Pickr.create({
		el: '#background',
		theme: 'nano',
		
		swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)'
		],
		
		default: '#FFFFFF',
		
		lockOpacity: false,
		
		components: {

			// Main components
			preview: true,
			opacity: false,
			hue: true,

			// Input / output Options
			interaction: {
				hex: true,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: false,
				save: true,
				cancel: true
			}
		}
		});	

		pickr.on('save', (color, instance) => {
			c = color.toRGBA();
			bcolor=[(c[0])/255, (c[1])/255, (c[2])/255];
		});
		
		const pickr1 = Pickr.create({
		el: '#one',
		theme: 'nano',
		
		swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)'
		],
		
		default: '#F9B4AB',
		
		lockOpacity: false,
		
		components: {

			// Main components
			preview: true,
			opacity: false,
			hue: true,

			// Input / output Options
			interaction: {
				hex: true,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: false,
				save: true,
				cancel: true
			}
		}
		});	

		pickr1.on('save', (color, instance) => {
			c = color.toRGBA();
			color1=[(c[0])/255, (c[1])/255, (c[2])/255];
		});
		
		const pickr2 = Pickr.create({
		el: '#two',
		theme: 'nano',
		
		swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)'
		],
		
		default: '#264E70',
		
		lockOpacity: false,
		
		components: {

			// Main components
			preview: true,
			opacity: false,
			hue: true,

			// Input / output Options
			interaction: {
				hex: true,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: false,
				save: true,
				cancel: true
			}
		}
		});	

		pickr2.on('save', (color, instance) => {
			c = color.toRGBA();
			color2=[(c[0])/255, (c[1])/255, (c[2])/255];
		});
		
		const pickr3 = Pickr.create({
		el: '#three',
		theme: 'nano',
		
		swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)'
		],
		
		default: '#FDEBD3',
		
		lockOpacity: false,
		
		components: {

			// Main components
			preview: true,
			opacity: false,
			hue: true,

			// Input / output Options
			interaction: {
				hex: true,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: false,
				save: true,
				cancel: true
			}
		}
		});	

		pickr3.on('save', (color, instance) => {
			c = color.toRGBA();
			color3=[(c[0])/255, (c[1])/255, (c[2])/255];
		});
		
		const pickr4 = Pickr.create({
		el: '#four',
		theme: 'nano',
		
		swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)'
		],
		
		default: '#679186',
		
		lockOpacity: false,
		
		components: {

			// Main components
			preview: true,
			opacity: false,
			hue: true,

			// Input / output Options
			interaction: {
				hex: true,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: false,
				save: true,
				cancel: true
			}
		}
		});	

		pickr4.on('save', (color, instance) => {
			c = color.toRGBA();
			color4=[(c[0])/255, (c[1])/255, (c[2])/255];
		});