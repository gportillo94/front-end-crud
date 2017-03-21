"use strict"; 

var XMLtxt = "<autos>\
	<auto>\
		<placas>123ABC</placas>\
		<precio>123456789</precio>\
		<marca>Nissan</marca>\
		<modelo>Tsuru</modelo>\
		<version>Basica</version>\
		<tipo>Sedan</tipo>\
		<ano>2010</ano>\
		<kilometraje>12345</kilometraje>\
		<cilindros>4</cilindros>\
		<hp>100</hp>\
		<colorint>#ffffff</colorint>\
		<colorext>#000000</colorext>\
		<transmision>manual</transmision>\
		<combustible>gasolina</combustible>\
		<ac>false</ac>\
	</auto>\
	<auto>\
		<placas>456DEF</placas>\
		<precio>987654321</precio>\
		<marca>Ford</marca>\
		<modelo>modelo2</modelo>\
		<version>version2</version>\
		<tipo>tipo2</tipo>\
		<ano>2013</ano>\
		<kilometraje>321456</kilometraje>\
		<cilindros>6</cilindros>\
		<hp>156</hp>\
		<colorint>#ffffff</colorint>\
		<colorext>#000000</colorext>\
		<transmision>automatica</transmision>\
		<combustible>gasolina</combustible>\
		<ac>true</ac>\
	</auto>\
</autos>"

var JSONtxt  = '['; 
JSONtxt +=  '{ "placas":"123456", "precio": "80000" , "ano": "2010","modelo":"hemi", "colorint":"#ff0000","colorext":"black","kilometraje":"100000","transmision":"auto","ac":"true","version":"Coupe","marca":"Nissan","cilindros":"6","hp":"60","combustible":"gasolina","tipo":"Deportivo"},';
JSONtxt +=	'{ "placas":"456789", "precio": "100000" , "ano": "2010","modelo":"srt", "colorint":"#00ff00","colorext":"black","kilometraje":"100000","transmision":"auto","ac":"true","version":"Coupe","marca":"Nissan","cilindros":"6","hp":"60","combustible":"gasolina","tipo":"Coupe"},';
JSONtxt +=	'{ "placas":"789123", "precio": "200000" , "ano": "2010","modelo":"normal", "colorint":"#0000ff","colorext":"black","kilometraje":"100000","transmision":"manual","ac":"true","version":"Coupe","marca":"Nissan","cilindros":"6","hp":"60","combustible":"gasolina", "tipo":"Deportivo"}';
JSONtxt +=		']';

var parser = new DOMParser();
var xmlDoc = parser.parseFromString(XMLtxt,"text/xml");
var autos = JSON.parse(JSONtxt);

function buscarIndicePlacasJSON(valor){
	for (var i=0 ; i<autos.length ; i++){
		if (autos[i].placas == valor){
			return i; 
		}
	}
}

function buscarIndicePlacasXML(valor){
	var x = xmlDoc.getElementsByTagName("auto");
	for(var i=0 ; i<x.length ; i++){
		if (x[i].getElementsByTagName("placas")[0].textContent === valor)
			return i ;
	} 
}

function headerTabla(){
	return "<thead><tr>\
	<th>Placas</th>\
	<th>Precio</th>\
	<th>Marca</th>\
	<th>Modelo</th>\
	<th>Version</th>\
	<th>Tipo</th>\
	<th>Año</th>\
	<th>Kilometraje</th>\
	<th>Num cilindros</th>\
	<th>HP</th>\
	<th>Color interior</th>\
	<th>Color exterior</th>\
	<th>Transmision</th>\
	<th>Combustible</th>\
	<th>AC</th>\
	</tr></thead>";
}

function ocultarTodo(){
	$("#altas").hide() ; 
	$("#bajas").hide() ; 
	$("#buscar").hide() ; 
	$("#cambios").hide() ; 
	$("#reporte").hide() ; 
	$("#exportar").hide() ; 
}

function altas(){
	ocultarTodo() ; 
	$("#altas").show() ; 
	$("#altas input").each(function(index, el) {
		$(el).val(""); 
	}); 

} 

function bajas(){
	ocultarTodo() ; 
	$("#bajas").show() ; 
	$("#infoBjson").text(""); 
	$("#infoBxml").text(""); 
}

function buscar(){
	ocultarTodo() ; 
	$("#buscar").show() ; 
}

function cambios(){
	ocultarTodo() ; 
	$("#cambios").show(); 
	$("#buscarC").val(""); 
	$("#index").text(""); 
	$("#formCambios input").each(function(index, el) {
		$(el).val(""); 
	}); 
	$("#formCambios p").each(function(index, el) {
		$(el).text(""); 
	}); 
}

function exportar(){
	ocultarTodo() ; 
	$("#exportar").show() ; 
	var exportedXML = new XMLSerializer().serializeToString(xmlDoc) ; 
	exportedXML = exportedXML.replace(/\s+/g, '');
	$("#xmltext").val(exportedXML) ; 
	$("#jsontext").val(JSON.stringify(autos)) ; 
}

function busqueda(){
	var jtabla = $("#resultadoBusqueda") ; 
	jtabla.empty() ; 
	var campo = $("#campoBusqueda").val(); 
	var valor = $("#textoBusqueda").val(); 
	var x = xmlDoc.getElementsByTagName("auto");
	var newRow = headerTabla() ; 

	for (var index=0 ; index<x.length ; index++){
		if (x[index].getElementsByTagName(campo)[0].textContent === valor){
			newRow += "<tr>" ;
			for (var i=0 ; i<x[index].children.length ; i++){
				newRow += "<td>" + 	x[index].children[i].textContent + "</td>";
			}
			newRow += "</tr>";
		}
	}

	for (var index=0 ; index<autos.length ; index++){
		if (autos[index][campo] === valor){
			newRow += "<tr>" ;
			newRow += "<td>" + autos[index].placas + "</td>";
			newRow += "<td>" + autos[index].precio + "</td>";
			newRow += "<td>" + autos[index].marca + "</td>";
			newRow += "<td>" + autos[index].modelo + "</td>";
			newRow += "<td>" + autos[index].version + "</td>";
			newRow += "<td>" + autos[index].tipo + "</td>";
			newRow += "<td>" + autos[index].ano + "</td>";
			newRow += "<td>" + autos[index].kilometraje + "</td>";
			newRow += "<td>" + autos[index].cilindros + "</td>";
			newRow += "<td>" + autos[index].hp + "</td>";
			newRow += "<td>" + autos[index].colorint + "</td>";
			newRow += "<td>" + autos[index].colorext + "</td>";
			newRow += "<td>" + autos[index].transmision + "</td>";
			newRow += "<td>" + autos[index].combustible + "</td>";
			newRow += "<td>" + autos[index].ac + "</td>";
			newRow += "</tr>";
		}
	}
	jtabla.append(newRow); 
}

function reporte(){
	ocultarTodo() ; 
	$("#reporte").show() ; 
	var x = xmlDoc.getElementsByTagName("auto");
	var tablaXML = $("#tablaReporteXML") ; 
	var nvoRenXML = ""	; 
	var tablaJSON = $("#tablaReporteJSON") ; 
	var nvoRenJSON = ""	; 
	tablaXML.empty() ; 
	tablaXML.append(headerTabla()); 
	tablaJSON.empty() ; 
	tablaJSON.append(headerTabla()); 
	
	for (var i=0 ; i<x.length ; i++){
		nvoRenXML += "<tr>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("placas")[0].textContent +"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("precio")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("marca")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("modelo")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("version")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("tipo")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("ano")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("kilometraje")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("cilindros")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("hp")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("colorint")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("colorext")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("transmision")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("combustible")[0].textContent+"</td>"; 
		nvoRenXML += "<td>"+ x[i].getElementsByTagName("ac")[0].textContent+"</td>"; 
		nvoRenXML += "</tr>"; 
	}
	for (var i=0 ; i<autos.length ; i++){
		nvoRenJSON += "<tr>"; 
		nvoRenJSON += "<td>"+autos[i].placas+"</td>" ; 
		nvoRenJSON += "<td>"+autos[i].precio+"</td>";
		nvoRenJSON += "<td>"+autos[i].marca+"</td>";
		nvoRenJSON += "<td>"+autos[i].modelo+"</td>";
		nvoRenJSON += "<td>"+autos[i].version+"</td>";
		nvoRenJSON += "<td>"+autos[i].tipo+"</td>";
		nvoRenJSON += "<td>"+autos[i].ano+"</td>";
		nvoRenJSON += "<td>"+autos[i].kilometraje+"</td>";
		nvoRenJSON += "<td>"+autos[i].cilindros+"</td>";
		nvoRenJSON += "<td>"+autos[i].hp+"</td>";
		nvoRenJSON += "<td>"+autos[i].colorint+"</td>";
		nvoRenJSON += "<td>"+autos[i].colorext+"</td>";
		nvoRenJSON += "<td>"+autos[i].transmision+"</td>";
		nvoRenJSON += "<td>"+autos[i].combustible+"</td>"; 
		nvoRenJSON += "<td>"+autos[i].ac+"</td>"; 
		nvoRenJSON += "</tr>"; 
	}
	tablaXML.append(nvoRenXML) ; 
	tablaJSON.append(nvoRenJSON) ; 
}

function buscarIndicePlacasJSON(valor){
	for (var i=0 ; i<autos.length ; i++){
		if (autos[i].placas == valor){
			return i; 
		}
	}
}

function buscarIndicePlacasXML(valor){
	var x = xmlDoc.getElementsByTagName("auto");
	for(var i=0 ; i<x.length ; i++){
		if (x[i].getElementsByTagName("placas")[0].textContent === valor)
			return i ;
	} 
}

function deleteData(){
	var indexXML = buscarIndicePlacasXML($("#placasB").val());
	var indexJSON = buscarIndicePlacasJSON($("#placasB").val());
	if (indexJSON === undefined)
		$("#infoBjson").text("No existe en JSON"); 
	else{
		var res = autos.splice(indexJSON,1); 
		if (res != null)
			$("#infoBjson").text("Baja exitosa de JSON"); 	
		else
			$("#infoBjson").text("ERROR"); 
	}
	if (indexXML === undefined)
		$("#infoBxml").text("No existe en XML")   ; 
	else{
		var res = xmlDoc.documentElement.removeChild(xmlDoc.getElementsByTagName("auto")[indexXML]) ; 
		if (res != null)
			$("#infoBxml").text("Baja exitosa de XML"); 	
		else
			$("#infoBxml").text("ERROR"); 
	}
}

function sendData(){
	var newplacasA = xmlDoc.createElement("placas");
	var newprecioA = xmlDoc.createElement("precio");
	var newmarcaA = xmlDoc.createElement("marca");
	var newmodeloA = xmlDoc.createElement("modelo");
	var newversionA = xmlDoc.createElement("version");
	var newtipoA = xmlDoc.createElement("tipo");
	var newanoA = xmlDoc.createElement("ano");
	var newkiloA = xmlDoc.createElement("kilometraje");
	var newcilA = xmlDoc.createElement("cilindros");
	var newhpA = xmlDoc.createElement("hp");
	var newcolorintA = xmlDoc.createElement("colorint");
	var newcolorextA = xmlDoc.createElement("colorext");
	var newtransA = xmlDoc.createElement("transmision");
	var newcombuA = xmlDoc.createElement("combustible");
	var newacA = xmlDoc.createElement("ac");
	var newEle = xmlDoc.createElement("auto");
	var nvoAuto = {} ; 

	nvoAuto.placas = newplacasA.textContent = $("#placasA").val(); 
	nvoAuto.precio =  newprecioA.textContent= $("#precioA").val() ; 
	nvoAuto.marca = newmarcaA.textContent= $("#marcaA").val(); 
	nvoAuto.modelo =  newmodeloA.textContent= $("#modeloA").val(); 
	nvoAuto.version = newversionA.textContent = $("#versionA").val(); 
	nvoAuto.tipo = newtipoA.textContent= $("#tipoA").val(); 
	nvoAuto.ano = newanoA.textContent= $("#anoA").val(); 
	nvoAuto.kilometraje = newkiloA.textContent= $("#kiloA").val(); 
	nvoAuto.cilindros = newcilA.textContent= $("#cilindrosA").val(); 
	nvoAuto.hp = newhpA.textContent= $("#hpA").val(); 
	nvoAuto.colorint = newcolorintA.textContent= $("#colorintA").val(); 
	nvoAuto.colorext  = newcolorextA.textContent= $("#colorextA").val(); 
	nvoAuto.transmision = newtransA.textContent= $("#transmisionA").val(); 
	nvoAuto.combustible =  newcombuA.textContent= $("#combustibleA").val(); 
	nvoAuto.ac = newacA.textContent= $("#acA").val(); 
	
	newEle.appendChild(newplacasA) ; 
	newEle.appendChild(newprecioA) ; 
	newEle.appendChild(newmarcaA) ; 
	newEle.appendChild(newmodeloA) ; 
	newEle.appendChild(newversionA) ; 
	newEle.appendChild(newtipoA) ; 
	newEle.appendChild(newanoA) ; 
	newEle.appendChild(newkiloA) ; 
	newEle.appendChild(newcilA) ; 
	newEle.appendChild(newhpA) ; 
	newEle.appendChild(newcolorintA) ; 
	newEle.appendChild(newcolorextA) ; 
	newEle.appendChild(newtransA) ; 
	newEle.appendChild(newcombuA); 
	newEle.appendChild(newacA);

	xmlDoc.getElementsByTagName("autos")[0].appendChild(newEle);
	autos.push(nvoAuto); 

	alert("Alta Realizada");
}

function changeData(){
	var indexJSON = buscarIndicePlacasJSON($("#buscarC").val());
	var indexXML = buscarIndicePlacasXML($("#buscarC").val());
	console.log(indexJSON , indexXML) ; 
	if (indexJSON !== undefined){
		console.log("json part") ; 
		$("#placasC").val( autos[indexJSON].placas) ; 
		$("#precioC").val( autos[indexJSON].precio); 
		$("#marcaC").val( autos[indexJSON].marca); 
		$("#modeloC").val( autos[indexJSON].modelo); 
		$("#versionC").val( autos[indexJSON].version); 
		$("#tipoC").val( autos[indexJSON].tipo); 
		$("#anoC").val( autos[indexJSON].ano); 
		$("#kiloC").val( autos[indexJSON].kilometraje) ; 
		$("#cilindrosC").val( autos[indexJSON].cilindros); 
		$("#hpC").val( autos[indexJSON].hp); 
		$("#colorintC").val( autos[indexJSON].colorint); 
		$("#colorextC").val( autos[indexJSON].colorext); 
		$("#transmisionC").val( autos[indexJSON].transmision); 
		$("#combustibleC").val( autos[indexJSON].combustible); 
		$("#acC").val( autos[indexJSON].ac); 

	}
	else if (indexXML !== undefined){
		console.log("xml part") ; 
		var x = xmlDoc.getElementsByTagName("auto") ; 
		$("#placasC").val( x[indexXML].getElementsByTagName("placas")[0].textContent) ; 
		$("#precioC").val( x[indexXML].getElementsByTagName("precio")[0].textContent ); 
		$("#marcaC").val( x[indexXML].getElementsByTagName("marca")[0].textContent ); 
		$("#modeloC").val( x[indexXML].getElementsByTagName("modelo")[0].textContent ); 
		$("#versionC").val( x[indexXML].getElementsByTagName("version")[0].textContent ); 
		$("#tipoC").val( x[indexXML].getElementsByTagName("tipo")[0].textContent ); 
		$("#anoC").val( x[indexXML].getElementsByTagName("ano")[0].textContent ); 
		$("#kiloC").val( x[indexXML].getElementsByTagName("kilometraje")[0].textContent) ; 
		$("#cilindrosC").val( x[indexXML].getElementsByTagName("cilindros")[0].textContent ); 
		$("#hpC").val( x[indexXML].getElementsByTagName("hp")[0].textContent ); 
		$("#colorintC").val( x[indexXML].getElementsByTagName("colorint")[0].textContent ); 
		$("#colorextC").val( x[indexXML].getElementsByTagName("colorext")[0].textContent ); 
		$("#transmisionC").val( x[indexXML].getElementsByTagName("transmision")[0].textContent ); 
		$("#combustibleC").val( x[indexXML].getElementsByTagName("combustible")[0].textContent ); 
		$("#acC").val( x[indexXML].getElementsByTagName("ac")[0].textContent ); 

	}
	$("#indexXML").text(indexXML); 
	$("#indexJSON").text(indexJSON); 
}

function updateData(indexJSON, indexXML){
	console.log("indexJSON", indexJSON == "") ; 
	console.log("indexXML" , indexXML== "") ; 
	if (indexJSON != ""){ 
		console.log("json part") ; 
		autos[indexJSON].placas  = $("#placasC").val();
		autos[indexJSON].precio  = $("#precioC").val(); 
		autos[indexJSON].marca = $("#marcaC").val() ;
		autos[indexJSON].modelo = $("#modeloC").val() ;
		autos[indexJSON].version = $("#versionC").val() ;
		autos[indexJSON].tipo = $("#tipoC").val() ; 
		autos[indexJSON].ano = $("#anoC").val() ; 
		autos[indexJSON].kilometraje = $("#kiloC").val() ;
		autos[indexJSON].cilindros = $("#cilindrosC").val();
		autos[indexJSON].hp = $("#hpC").val() ;
		autos[indexJSON].colorint = $("#colorintC").val();
		autos[indexJSON].colorext = $("#colorextC").val() ;
		autos[indexJSON].transmision = $("#transmisionC").val() ;
		autos[indexJSON].combustible = $("#combustibleC").val() ;
		autos[indexJSON].ac = $("#acC").val();
	}
	if  (indexXML != ""){
		console.log("xml part") ; 
		var x = xmlDoc.getElementsByTagName("auto") ; 
		x[indexXML].getElementsByTagName("placas")[0].textContent = $("#placasC").val();
		x[indexXML].getElementsByTagName("precio")[0].textContent  = $("#precioC").val(); 
		x[indexXML].getElementsByTagName("marca")[0].textContent  = $("#marcaC").val() ;
		x[indexXML].getElementsByTagName("modelo")[0].textContent = $("#modeloC").val() ;
		x[indexXML].getElementsByTagName("version")[0].textContent = $("#versionC").val() ;
		x[indexXML].getElementsByTagName("tipo")[0].textContent = $("#tipoC").val() ; 
		x[indexXML].getElementsByTagName("ano")[0].textContent = $("#anoC").val() ; 
		x[indexXML].getElementsByTagName("kilometraje")[0].textContent = $("#kiloC").val() ;
		x[indexXML].getElementsByTagName("cilindros")[0].textContent = $("#cilindrosC").val();
		x[indexXML].getElementsByTagName("hp")[0].textContent = $("#hpC").val() ;
		x[indexXML].getElementsByTagName("colorint")[0].textContent = $("#colorintC").val();
		x[indexXML].getElementsByTagName("colorext")[0].textContent = $("#colorextC").val() ;
		x[indexXML].getElementsByTagName("transmision")[0].textContent = $("#transmisionC").val() ;
		x[indexXML].getElementsByTagName("combustible")[0].textContent = $("#combustibleC").val() ;
		x[indexXML].getElementsByTagName("ac")[0].textContent = $("#acC").val();
	}
	alert("Cambio Realizado");
	cambios() ; 
}