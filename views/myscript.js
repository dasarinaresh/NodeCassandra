/**
 * 
 */

/*function showfields(){
	alert("select");
	var sel = document.getElementById('selectRadio');
	var ins = document.getElementById('insertRadio');
	if(sel.style.display === 'none'){
		sel.style.display = '';
		ins.style.display = 'none';
	}
};

function showIfields(){}
	var sel = document.getElementById('selectRadio');
	var ins = document.getElementById('insertRadio');
	if(ins.style.display === 'none'){
		ins.style.display = '';
		sel.style.display = 'none';
	}
};
*/

//var x= document.getElementById("selectRadio");
//alert(x.checked);
//
//if(document.getElementById('selectRadio').checked){
//	alert("select");
//}

document.getElementById('selectRadio').onclick = function(){
//	alert("sel");
	if(document.getElementById('selectRadio').checked ){
		document.getElementById('select').style.display='inline-block';
		document.getElementById('insert').style.display='none';
	};
}

document.getElementById('insertRadio').onclick = function(){
	if(document.getElementById('insertRadio').checked ){
		document.getElementById('insert').style.display='inline-block';
		document.getElementById('select').style.display='none';
	};
}

document.getElementById('selSubmit').onclick = function(){
//	alert("submit clicked");
	var items = document.getElementById('selectfld');
	var sel = document.getElementById('DataBase');
	var dbname = sel.options[sel.selectedIndex].text;
	var sel = document.getElementById('table');
	var tblname = sel.options[sel.selectedIndex].text;
//	alert(tblname);
//	alert(dbname);
	var fieldnames = [];
	var jsonText = '{ "dbname"'+':"'+dbname+'","tablename":"'+tblname+'","fieldnames" : [';
	for (i = 0; i < items.selectedOptions.length; i++) {
		fieldnames.push(items.selectedOptions[i].text);
		jsonText = jsonText + '{"'+items.selectedOptions[i].text +'":"'+items.selectedOptions[i].text+'"},';
		
	}
	jsonText = jsonText + ']}';
//	alert(jsonText);
	var flds = JSON.stringify(jsonText);
	var req = new XMLHttpRequest();
	req.open('GET', "localhost:5000/cassandra/select/:"+flds, true);
	req.send();
}