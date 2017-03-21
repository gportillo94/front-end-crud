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

}

function exportar(){
	ocultarTodo() ; 
	$("#exportar").show() ; 
	var exportedXML = new XMLSerializer().serializeToString(xmlDoc) ; 
	exportedXML = exportedXML.replace(/\s+/g, '');
	$("#xmltext").val(exportedXML) ; 
	$("#jsontext").val(JSON.stringify(autos)) ; 
}

function reporte(){
	ocultarTodo() ; 
	$("#reporte").show() ; 
	var tabla = document.getElementById("tablaReporteXML");
	var x = xmlDoc.getElementsByTagName("auto");
	tabla.innerHTML =  "";
	tabla.innerHTML = headerTabla() ; 

	for(var i = 0; i < x.length; i++){
		tabla.innerHTML +=  "<tr>"
		+   "<td>"
		+      x[i].getElementsByTagName("placas")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("precio")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("marca")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("modelo")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("version")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("tipo")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("ano")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("kilometraje")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("cilindros")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("hp")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("colorint")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("colorext")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("transmision")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("combustible")[0].textContent
		+   "</td>"
		+   "<td>"
		+      x[i].getElementsByTagName("ac")[0].textContent
		+   "</td>"
		+"</tr>";
	} 


	var tablaJSON = $("#tablaReporteJSON") ; 
	tablaJSON.empty() ; 
	tablaJSON.append(headerTabla()); 
	var nvoRen = ""	; 
	for (var i=0 ; i<autos.length ; i++){
		nvoRen += "<tr>"; 
		nvoRen += "<td>"+autos[i].placas+"</td>" ; 
		nvoRen += "<td>"+autos[i].precio+"</td>";
		nvoRen += "<td>"+autos[i].marca+"</td>";
		nvoRen += "<td>"+autos[i].modelo+"</td>";
		nvoRen += "<td>"+autos[i].version+"</td>";
		nvoRen += "<td>"+autos[i].tipo+"</td>";
		nvoRen += "<td>"+autos[i].ano+"</td>";
		nvoRen += "<td>"+autos[i].kilometraje+"</td>";
		nvoRen += "<td>"+autos[i].cilindros+"</td>";
		nvoRen += "<td>"+autos[i].hp+"</td>";
		nvoRen += "<td>"+autos[i].colorint+"</td>";
		nvoRen += "<td>"+autos[i].colorext+"</td>";
		nvoRen += "<td>"+autos[i].transmision+"</td>";
		nvoRen += "<td>"+autos[i].combustible+"</td>"; 
		nvoRen += "<td>"+autos[i].ac+"</td>"; 
		nvoRen += "</tr>"; 
	}
	tablaJSON.append(nvoRen) ; 
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
				newRow += "<td>" + x[index].children[i].textContent + "</td>";
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