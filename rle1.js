let fs = require('fs');
let arg = process.argv;
let gridSymbol = String.fromCharCode(35);
let i = 0, j = 1;
let coded = '';
let decoded = "";
function cod() {
	fs.readFile('input.txt', (err, data) => {
	if (err){
		console.erorr(err);
		return ;
	}
	let inText = data.toString();
	while (i < inText.length){
		while(inText.charAt(i) == inText.charAt(i+j))
			j++;
		let object = j;
		while (j > 255){
			j -= 255 ;
			coded += gridSymbol + String.fromCharCode(255) + inText.charAt(i);
		}
		if (j > 4){
			coded += gridSymbol + String.fromCharCode(j) + inText.charAt(i);
		}
		if (j <= 4) { 
			if (inText.charAt(i) == gridSymbol)
			coded += gridSymbol + String.fromCharCode(j) + inText.charAt(i);
		else{
				let count = 0 ;
				while (count < j) {
					coded += inText.charAt(i) ;
					count++;
				}
			}
		}
		i += object;
		j = 1;	
	}
	fs.writeFile('code.txt', coded, (err) => {	
		if (err){
			console.err(err);
			return;
		}
		
	});
});
}
function decod() {
	fs.writeFile('code.txt', coded, (err) => {	
		if (err){
			console.err(err);
			return;
		}
	let inTemp = coded.toString();
	for (t = 0; i < inTemp.length; t++){
		coded += inTemp.charAt(t);
	}
	i = 0;
	while (i < coded.length) { 
		if (coded[i] != gridSymbol){  
			decoded += coded[i];
			i++;
		}
		else   
			for (s = 0 ; s < coded[i+1].charCodeAt(0) ; s++){ 
				decoded += coded[i+2] ;
			}
			i += 3;
		
	}
	fs.writeFile('decode.txt', decoded, (err) => {
		if (err) {
			console.err(err) ;
			return ;
		}
	}) ;
	});
}
cod();
decod();
