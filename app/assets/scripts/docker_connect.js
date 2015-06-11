function docker_connect (host, path, placement) {
	console.log(host, path, placement);

	$('#'+placement).html('<iframe class="col s12 box z-depth-2" src="http://' + host + path + '" width="450px" height="400px"></iframe>');
}