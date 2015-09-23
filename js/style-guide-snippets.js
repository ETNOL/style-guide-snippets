
var CodeSampleInjector = function () {
		// Attributes
		this.$element = null;
		this.codeSample = null;

		// Methods
		this.init = function (element) {
				this.$element = $(element);
				this.codeSample = this.$element.html();
				this._removeClass();
				this._trimCodeSample();
				this._addWrapperTags();
				this._appendToElement();
				this._appendToggleButton();
				this._addToggleListener();
		};
			
		this._removeClass = function () {
			this.$element.removeClass('code-sample');
		};
		
		this._trimCodeSample = function () {
			var contentsArray = this.codeSample.split(/[\n\r]/g);
			contentsArray.forEach(function (element, index) {
				var fourSpacesMatcher = /\t/;
				var trimmedElement = element.replace(fourSpacesMatcher, ""); // Trims First Tab
				contentsArray[index] = trimmedElement;
				if (element.match(/class="notes"/)) { // Removes Notes Sections
					contentsArray.splice(index, 1);
				}
			});
			this.codeSample = contentsArray.join("\n");
		};
	
		this._addWrapperTags = function () {
			 this.codeSample = $('<code class="language-markup">').text(this.codeSample);
			 this.codeSample = $('<pre>').html(this.codeSample);
		};
		
		this._appendToElement = function () {
			this.$element.append(this.codeSample);
      this.$element.find('pre').hide();
		};
		
		this._appendToggleButton = function () {
			var showIcon = $('<button>').addClass('code-show').text('Code');
			var buttonRow = $('<div>').addClass('button-wrapper').html(showIcon);
			this.$element.append(buttonRow);
		};
		
		this._addToggleListener = function () {
			var showButton = this.$element.find('.code-show');
			showButton.click( function (e) {
				this.$element.find('pre').slideToggle('fast');
				showButton.text() == 'Code' ? showButton.text('Hide') : showButton.text('Code');
			}.bind(this));
			
		};
};

// Init Code Sample Injector on each.

$('.code-sample').each(function (index, element) {
	var codeSampleInjector = new CodeSampleInjector();
	codeSampleInjector.init(element);
});


