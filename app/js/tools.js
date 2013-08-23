jQuery(document).ready(function() {

	//popup modal for video
	jQuery('.popup-vimeo').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		closeOnContentClick: false
	});
});