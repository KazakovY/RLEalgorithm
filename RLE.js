let fs = require('fs');
let arg = process.argv;
gridSymbol = String.fromCharCode(35);
i = 0, j = 1;
let coded = "";
let decoded = "";

fs.readFile('input.txt', (err, data) => {
	if (err){
		console.erorr(err);
		return 0;
	}
	let inText = data.toString();
	while (i < inText.length){
		while(inText.charAt(i) == inText.charAt(i+j))
			j++;
		while (j > 255){
			n -= 255 ;
			code = gridSymbol + String.fromCharCode(255) + inText.charCodeAt(i);
		}
		if (j % 255 > 4){
			code = gridSymbol + String.fromCharCode(j) + inText.charCodeAt(i);
		}
		 else{
			if (inText.charAt(i) == gridSymbol)
			coded = gridSymbol + String.fromCharCode(j) + inText.charCodeAt(i);
				let count = 0 ;
				while (count < j) {
					coded += inText.charAt(i) ;
					count += 1 ;
				}
		}
		i += j;
		j = 1; 		
	}
	fs.writeFile('code.txt', coded, (err) => { 
		if (err){
			console.err(err) ;
			return ;
		}
	}) ;
	while (i < coded.length) { 
		if (coded[i] != gridSymbol)  {  
			decoded += coded[i] ;
			i ++ ;
		}
		else {
			for (s = 0 ; s < coded[i+1].charCodeAt(0); s++) { 
				decoded += coded[i+2] ;
			}
			i += 4 ;
		}
	}
	fs.writeFile('decode.txt', decoded, (err) => {
		if (err) {
			console.err(err) ;
			return ;
		}
		console.log('The file has been saved!');
	});
});	