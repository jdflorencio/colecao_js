/*https://urin.github.io/jquery.balloon.js/index.html*/
var aux_time = '';
var dados_table1 = [];
var load_modal = function(modal){/*RESPONSAVEL PELO MODAL DE LOAD */ $(modal).modal({backdrop: "static"});/*abre o modal*/ }
var fechar_load = function(modal) {/*ENCERRA O MODAL*/ $(modal).modal('hide'); }
var calcula_data = function(data)
	{
		if(data.length< 8)
			{
				var total = "N";

			}
		else
			{	

				var datahoje = new  Date();
				var dia1 = datahoje.getDay()+14;
				var mes1 = datahoje.getMonth()+1;
				var ano1 = datahoje.getFullYear();		
				var dt_dados = data.split("/");		
				var dia2 = dt_dados[0];
				var mes2 = dt_dados[1];
				var ano2 = dt_dados[2];
				var antiga = ano2+"/"+mes2+"/"+dia2;
				var atual = ano1+"/"+mes1+"/"+dia1;		
				console.log(atual);
				date1 = new Date(antiga);
				date2 = new Date(atual);
				var diferenca = Math.abs(date1 - date2); //diferença em milésimos e positivo
				var dia = 1000*60*60*24; // milésimos de segundo correspondente a um dia
				var total = Math.round(diferenca/dia); //valor total de dias arredondado 
			}
		return total;
	}
function notify(cliente, titulo) 
	{
	    Notification.requestPermission(function() {
	        var notification = new Notification(':: ALERTA :: '+titulo+'', {
	            icon: 'http://sngpcbit.com.br/images/logo.fw.png',
	            body: cliente
	        });
	        notification.onclick = function() {
	            window.open("http://ecmsistemas.com.br/sngpc/teste.html#");
	        }
	    });
	}  
var configLinha = function(val, objHash, objTelefone)
	{
		//var btnMensagens = '<button id="btnMensagens" type="button" class="btn-outline btn-info btn-sm"><i class="glyphicon glyphicon-envelope"></i></button>';
		var btnMensagens = '<a id="btnMensagens" type="button" class="btn-outline btn-info btn-sm"><i class="glyphicon glyphicon-envelope"></i></button>';
		var btnConsultaSNGPC = '<a id="btnConsultaSNGPC" type="button" class="btn-outline btn-danger btn-sm"><i class="glyphicon glyphicon-refresh" aria-hidden="true"></i></button>';
		var btnObservacao = '<a tabindex="0" id="btnObservacao" data-trigger="click" data-container="body" data-toggle="popover" data-placement="left" type="button" class="btn-outline btn-success btn-sm"><i class="glyphicon glyphicon-pencil" aria-hidden="true"></i></button>';	
		var btnBloqueado = '<a  id="btnBloqueado" type="button" class="btn-outline btn-secondary btn-sm" disabled><i class="glyphicon glyphicon-remove"></i></button>';
		//console.log(val[5]);
		var aviso_dias = calcula_data(val[5]);
		var  aviso_colum = aviso_dias;
		//var aviso_colum = '1'
		//var aviso_dias = '1';
		if(aviso_dias=='1')
			{
				 aviso_dias = "Movimento em dias com ANVISA!";
			}
		else
			{
				aviso_dias = "Já faz "+aviso_dias+" dias desde o ultimo movimento enviado";
			}
		if(val[8]==1)
			{
				val[8] = '<i class="glyphicon glyphicon-ok"></i> Não';
			}
		else if(val[8]==2)
			{
				val[8] = '<i class="glyphicon glyphicon-ok"></i> Não';
			}
		else
			{
				val[8] = '';
			}
		if(val[11]== 0)
			{
				val[11] = '[Não]';
			}
		else if (val[11]==1)
			{
				val[11] = '[Sim]';
			}	
		else
			{
				val[11] = val[11] ;
			}			
		if(val[9])
		{

			if(val[9]==1)
			{
				if(objHash.length > 5 )
				{
					btnConsultaSNGPC = btnBloqueado;
					val[9] ='<strong style="color:green;"><i class="glyphicon glyphicon-ok"></i> Aceito</strong>';
					val[5] = '<i data-toggle="tooltip" data-placement="Right" title=" '+aviso_dias+'" class="glyphicon glyphicon-dashboard"></i>  '+val[5];
				}
				else
					{
						btnConsultaSNGPC = btnBloqueado;
						val[9] ='xxxxxx';
					}	
							
				}
			else if(val[9]==2)
			{
				if(objHash.length > 5)
					{					
						btnConsultaSNGPC = btnBloqueado;
						val[9] ='<strong style="color:#ff7f00;"><i class="glyphicon glyphicon-remove"></i> ERRO</strong>';
						val[0] =  '<strong style="color:#ff7f00;">'+val[0]+'</strong>';
						val[1] =  '<strong style="color:#ff7f00;">'+val[1]+'</strong>';
						val[2] =  '<strong style="color:#ff7f00;">'+val[2]+'</strong>';
						val[3] =  '<strong style="color:#ff7f00;">'+val[3]+'</strong>';
						val[4] =  '<strong style="color:#ff7f00;">'+val[4]+'</strong>';
						val[5] =  '<strong style="color:#ff7f00;">'+val[5]+'</strong>';
						val[6] =  '<strong style="color:#ff7f00;">'+val[6]+'</strong>';
						val[7] =  '<strong style="color:#ff7f00;">'+val[7]+'</strong>';
						val[8] =  '<strong style="color:#ff7f00;">'+val[8]+'</strong>';
						val[10] =  '<strong style="color:#ff7f00;">'+val[10]+'</strong>';
					}
				else
					{
						btnConsultaSNGPC = btnBloqueado;
						val[9] ='-----';
					}						
			}
			else
			{
				if(objHash.length > 5 )
					{
						btnConsultaSNGPC = btnConsultaSNGPC;
						val[9] ='<strong style="color:#607370;"><i class="glyphicon glyphicon-transfer"></i> Aguardando</strong>';
						val[0] =  '<strong style="color:#607370;">'+val[0]+'</strong>';
						val[1] =  '<strong style="color:#607370;">'+val[1]+'</strong>';
						val[2] =  '<strong style="color:#607370;">'+val[2]+'</strong>';
						val[3] =  '<strong style="color:#607370;">'+val[3]+'</strong>';
						val[4] =  '<strong style="color:#607370;">'+val[4]+'</strong>';
						val[5] =  '<strong style="color:#607370;">'+val[5]+'</strong>';
						val[6] =  '<strong style="color:#607370;">'+val[6]+'</strong>';
						val[7] =  '<strong style="color:#607370;">'+val[7]+'</strong>';
						val[8] =  '<strong style="color:#607370;">'+val[8]+'</strong>';
						val[10] =  '<strong style="color:#607370;">'+val[10]+'</strong>';
					}
				else
					{
						btnConsultaSNGPC = btnBloqueado;
						val[9] ='<strong style="color:red;"><i class="glyphicon glyphicon-exclamation-sign"></i> Verifique</strong>';
						val[6]= '<strong style="color:red;"><i class="glyphicon glyphicon-exclamation-sign"></i> </strong>';
						val[7] = '';
						val[0] =  '<strong style="color:red;">'+val[0]+'</strong>';
						val[1] =  '<strong style="color:red;">'+val[1]+'</strong>';
						val[2] =  '<strong style="color:red;">'+val[2]+'</strong>';
						val[3] =  '<strong style="color:red;">'+val[3]+'</strong>';
						val[4] =  '<strong style="color:red;">'+val[4]+'</strong>';
						val[5] =  '<strong style="color:red;">'+val[5]+'</strong>';
						val[10] =  '<strong style="color:red;">'+val[10]+'</strong>';
					}					
			}
		}		
		//var tel = obj.clientes[i].telefones;
		var telefones = '';	
		for(var x = 0; objTelefone.length>x; x++)
			{
				var telefones = telefones + '<p><strong>Telefone: </strong>'+objTelefone[x].ddd +' '+objTelefone[x].fone+'</p>'
			}
		$("#sngpc_column").append('<tr id="'+val[1]+'"><td >'+val[0]+'</td><td style="width: 20%">'+val[1]+' - '+val[2]+'</td><td style="width: 7%">'+val[3]+'</td><td>'+val[4]+'</td><td>'+val[5]+'</td><td>'+val[6]+' '+val[7]+'</td><td>'+val[8]+'</td>\
		<td ><a data-toggle="tooltip" data-placement="Right" title=" '+aviso_dias+'" href="#" >'+aviso_colum+'</a></td><td>'+val[11]+'</td><td>'+btnMensagens+' '+btnConsultaSNGPC+' '+btnObservacao+'</td>\
		<td style="width: 10%">'+val[9]+'</td></tr>');
		 $('[data-toggle="tooltip"]').tooltip();
		//$('#ballonContatos2'+i+'').popover({html: true, container: 'body', delay: 5, placement: 'left'});
		fechar_load("#Mload");	
	}
var montaTable = function(obj)
	{	var tamObj = obj.clientes.length;
		//var btnView = '<button type="button" class="btn-outline btn-primary btn-sm"><i class="glyphicon glyphicon-eye-open"></i></button>';	
		//getContent( obj.ultimo_alterado );	
		for(var i =0; tamObj>i ; i++)
			{
				var val = [i+1, obj.clientes[i].codint, obj.clientes[i].nome, obj.clientes[i].estado, obj.clientes[i].sngpc_registro[0].datainiciomovimento, obj.clientes[i].sngpc_registro[0].datafimmovimento, obj.clientes[i].sngpc_registro[0].datahj, obj.clientes[i].sngpc_registro[0].hratual, obj.clientes[i].sngpc_registro[0].movimentovazio,obj.clientes[i].sngpc_registro[0].statusmovimento, obj.clientes[i].sngpc_registro[0].tela, obj.clientes[i].sngpc_registro[0].importado];
				configLinha(val, obj.clientes[i].sngpc_registro[0].hash, obj.clientes[i].telefones);				
			}					
			$('#sngpcTable').DataTable(	{
				 //"lengthMenu": [[6, 25, 50, -1], [6, 25, 50, "All"]]
				 scrollY: '50vh',
				 scrollColapse: true,
				 paging: false
			});
	}
var table = function()
	{//REPOSANVEL POR EXIBIR A TABELA NA TELA PRINCIPAL statusmovimento		
		$.ajax(
			{		
				type:"POST", 
				url: "app/views/sngpc_views.php",		
				success: function(dados)
					{	//load_modal("#Mload");
						$("#conteudos").html(dados);				
					}		
			});
	}
function getContent(timestamp)
{
	/*funcão reponsavel para retornar as consultas do servidorweb*/
	var queryString = { 'timestamp' : timestamp };		
	$.post ( 'app/models/server.php' , queryString , function ( data )
	{	
		//console.log(data.length);
		var obj = jQuery.parseJSON(data);	
		switch(timestamp)
		{
			case undefined:			
				montaTable(obj);
				dados_table1 = obj.clientes;//armazenar os dados dos clientes da tabela no vetor 	
				getContent(obj.ultimo_alterado);		
				break;				
			default:								
				var tam = obj.clientes.length;
				/*PARA FAZER [VERIFICAR O TIMESTAMP E COMPARAR COM aux_time SE FALSO ADICIONAR UMA NOVA LINHA NA TABLE HTML PRINCIPAL  ]*/
				for(var i =0; tam>i ; i++)
				{	
					var onde = obj.clientes[i].sngpc_registro[0].tela;
					
					switch(onde)
						{
							case "1":
								var titulo = 'ABRIU O SISTEMA';
								var corpo = "Cliente: " +obj.clientes[i].codigocliente+"-"+obj.clientes[i].nome + " ultimo movimento foi: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
								//console.log(corpo);
								notify(corpo, titulo);
								break;
							case "2":
								var titulo = 'ENVIO DE MOVIMENTO';
								var corpo = "Cliente: " +obj.clientes[i].codigocliente+" -"+obj.clientes[i].nome + " Acabou de enviar o movimento: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
								//console.log(corpo);
								notify(corpo, titulo);
								break;
							case "3":
								var titulo = 'ENVIO DE INVÉNTARIO';
								var corpo = "Cliente: " +obj.clientes[i].codigocliente+" -"+obj.clientes[i].nome + " Invétario: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
								//console.log(corpo);
								notify(corpo, titulo);
								break;							
							case "4":
								var titulo = 'RETORNO DO SNGPC';
								var corpo = "Cliente " +obj.clientes[i].codigocliente+" -"+obj.clientes[i].nome + " Retorno SNGPC: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
								//console.log(corpo);
								notify(corpo, titulo);
								break;
							default:
								console.log('Nº '+ onde);
						}										
				}
				//console.log(obj);	
				//timeout: 30000
				getContent(obj.ultimo_alterado);
		}
				
	});
}
/*METODO PRINCIPAL*/
$(document).ready ( function ()
{
	
	var consulta_charts = function()
	{
		var vetor_result = [];
		var total = 0;
		var outras = 0;
		var antigas = 0;
		var recente = 0;
		$.ajax({
			type: "POST",
			url: "/sngpc/app/models/chats_build.php",
			dataType: "json",
			//data:{codigocliente: cdcliente},
			success: function(data)
				{
					
					for(var x = 0; data.versoes.length>x; x++)
						{

							if (data.versoes[x].build == "011216.a" || data.versoes[x].build == "031116.a" ||  data.versoes[x].build == "211116.a" || data.versoes[x].build ==  "141116.a")
								{
									 antigas = parseInt(data.versoes[x].qtd) + antigas;
									 console.log("a - "+antigas);

								}
							else if( data.versoes[x].build == "120117.c")
								{
									 recente = parseInt(data.versoes[x].qtd) + recente;
								}
							else
								{
									outras = parseInt(data.versoes[x].qtd) + outras;
								}						
						}
							total = parseInt(outras + antigas + recente / 100);
							recente = parseInt(recente * total);
							antigas = parseInt(antigas * total);
							console.log("1 - "+antigas);
							outras = parseInt(outras * total);
							vetor_result.push(recente, antigas, outras, total);
							//var result = [recente, antigas, outras ];
							console.log("2 - "+antigas);
							return antigas;
					}
		});
		
	}


 google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
      	var teste = consulta_charts();
      	console.log("3 - "+teste);
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Outra versoes',     70],                   
          ['141116.a',    7],
          ['211116.a',    7],
          ['120117.b',    7], 
          ['120117.c',    7]
        ]);

        var options = {
          title: 'Versoes do SNGPCBIT em uso.',
          is3D: true,
          backgroundColor: 'f8f8f8',
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }



	//consulta_charts();
	$('#btnMensagens').balloon();         
	load_modal("#Mload");
	getContent();
	table();
	$("#conteudos").on('click','#btnConsultaSNGPC', function()
		{	
			load_modal("#Mload");
			$(this).prop("disabled", true);
			this.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';			
			var idTable = $(this).closest('td').parent()[0].sectionRowIndex;			
			var tab1 = document.getElementById("sngpcTable").rows[idTable+1].cells[0].innerText;			
			var cdcliente = dados_table1[(tab1-1)].codigocliente;							
			console.log(idTable, cdcliente );
			$.ajax(
				{
					type: "POST",
					url: "/sngpc/consulta",
					dataType: "json",
					data:{codigocliente: cdcliente},
					success: function(data)
						{	//console.log(dados_table1[(tab1-1)]);//console.log('meu status é: '+data.statusmovimento);	
							dados_table1[(tab1-1)].sngpc_registro[0].mensagemerro = data.mensagemerro;	
							fechar_load("#Mload");							
							if(data.statusmovimento == 1)
								{
									var aceito = '<strong style="color:green;"><i class="glyphicon glyphicon-ok"></i> Aceito</strong>';
									var tab8 = document.getElementById("sngpcTable").rows[idTable+1].cells[10].innerHTML = aceito ;									
								}	
							else if(data.statusmovimento == 2)	
								{
									var aceito = '<strong style="color:#ff7f00;"><i class="glyphicon glyphicon-remove"></i> ERRO</strong>';
									var tab8 = document.getElementById("sngpcTable").rows[idTable+1].cells[10].innerHTML = aceito ;
								}
							else if(data.statusmovimento == 3)	
								{
									var aceito = '<strong style="color:#800080;"><i class="glyphicon glyphicon-transfer"></i> Espere Mais!</strong>';
									var tab8 = document.getElementById("sngpcTable").rows[idTable+1].cells[10].innerHTML = aceito ;
								}
							else
								{
									var aceito = '<strong style="color:#B22222;"><i class=" glyphicon glyphicon-thumbs-down"></i></strong>';
									var tab8 = document.getElementById("sngpcTable").rows[idTable+1].cells[10].innerHTML = aceito ;
								}
						}				
				})			
		});
		//$('#btnConsultaSNGPC').balloon({ minLifetime: 2000 });	
	$("#conteudos").on('click','#btnMensagens', function()
		{
				var idTable = $(this).closest('td').parent()[0].sectionRowIndex;
				var tab1 = document.getElementById("sngpcTable").rows[idTable+1].cells[0].innerText;
				//console.log(' valor:'+ tab1 +' onde clickei: '+idTable);
				var cliente = dados_table1[(tab1-1)];
				var mensagem = cliente.sngpc_registro[0].mensagemerro;
				if(mensagem !="" )
					{
						var mensagem_tratada = mensagem.split('[NOVA_LINHA]');		
					}
				//var mensagem_tratada = mensagem.split('[NOVA_LINHA]');
				$("#tituloMensagem").empty();
				$("#tituloMensagem").append('<h3 style="color:#0092b3;"><i class="glyphicon glyphicon-th"></i><strong>'+cliente.codigocliente+' - '+ cliente.nome+ '</strong> <small>'+cliente.cidade+'</small>'+'</h3>');
		 		$("#tituloMensagem").append('<p><Strong>Hash: </strong>'+cliente.sngpc_registro[0].hash+' <i class="glyphicon glyphicon-chevron-right"></i><strong> Login: </strong>'+cliente.LOGIN+' <i class="glyphicon glyphicon-chevron-right"></i><strong> Senha:  </strong>'+cliente.senha+'</p><p><strong>Movimento: </strong><span class="label label-info"></strong style="font-size:15px">'+cliente.sngpc_registro[0].datainiciomovimento+'</strong></span> <i class="glyphicon glyphicon-chevron-right"></i><span class="label label-info"> <strong>'+cliente.sngpc_registro[0].datafimmovimento+'</strong></span></p>');	 		
		 		$("#tituloMensagem").append('<p><strong>BUILD: </strong>'+cliente.build+'</p>');
		 		$("#conteudoMensagem").empty();	 
		 		load_modal("#modalMensagens");	
		 		var telefones = '';//receber os telefones 
		 		for(var x = 0; cliente.telefones.length>x; x++)
					{
						var telefones = telefones + ' ('+cliente.telefones[x].ddd +') - '+cliente.telefones[x].fone+' <i class="glyphicon glyphicon-chevron-right"></i> ';
					}
				$("#tituloMensagem").append('<p><strong>Telefone: </strong>'+telefones+'</p>');
		 		for(var i=0; mensagem_tratada.length>i; i++)
			 		{
			 			if(mensagem_tratada[i] != "")
			 				{
			 					$("#conteudoMensagem").append('<div class="well well-sm">'+ mensagem_tratada[i]+'</div>');
			 				}
			 			else
				 			{
				 				console.log(mensagem_tratada[i]);
				 			}
			 		}
		 		$.ajax({		
				type:"POST", 
				crossDomain: false,
				headers: {'X-Requested-With': 'XMLHttpRequest'},
				url: "app/views/hist.php",
				beforeSend: function()
					{
						$("#contentHistorico").html("<img src='http://ecmsistemas.com.br/sngpc/public/img/loading.gif'>");
					}, 		
				success: function(dados)
					{	//load_modal("#Mload");
						$("#contentHistorico").empty();	
						$("#contentHistorico").html(dados);				
					}		
			});
		 		var mercadoria = "/sngpc/historicos?codigocliente="+cliente.codigocliente;
		 		var dados_retornado = [];
		 		$.ajax( 
				{
					type: "GET",
					url: mercadoria,
					dataType: "json",
					beforeSend: function()
						{
							$("#tableHistorico").html("<img src='http://ecmsistemas.com.br/sngpc/public/img/loading.gif'>");						 		
						},
					success: function(data)					
						{							
							dados_retornado = data;
							//console.log(datahoje);
							var consultando_data = data.hitoricos[i].datahj.split("-");
							var confira_data = consultando_data[0];
							confira_data = confira_data.split("/");
							console.log(confira_data);
						},
					complete: function()
						{
							var data = dados_retornado;
							if(data.length<1)
								{
									$("body").html('<h1>Vazio</h1>');
								}						
							for(var i=0; data.hitoricos.length>i; i++)
								{
									$('#bHistorico').append('<tr id="linhax"><td bgcolor="#d8d8d8">'+data.hitoricos[i].datahj+'</td><td>'+data.hitoricos[i].datainiciomovimento+'</td><td>'+data.hitoricos[i].datafimmovimento+'</td><td>'+data.hitoricos[i].statusmovimento+'</td><td>'+data.hitoricos[i].tela+'</td>');
								}
							$('#tableHistorico').DataTable({						
					 			scrollY: '25vh',
					 			scrollColapse: true,
					 			paging: false
							});
						}
	 	});
});
//----------------------
$("#conteudos").on('click','#btnObservacao', function()
		{
			var idTable = $(this).closest('td').parent()[0].sectionRowIndex;
			var tab1 = document.getElementById("sngpcTable").rows[idTable+1].cells[0].innerText;
			var cliente = dados_table1[(tab1-1)];
			$('[data-toggle="popover"]').popover({content:'<form><div class="form-group"><label for="email">Observação</label><textarea row="40" cols="30" class="form-control" id="obs"></textarea></div><button type="submit" class="btn btn-default"><i class="glyphicon glyphicon-ok"></button></form>',
				html: true,
				animation: true});
			$('html').on('click', function(e) {
			    if(!$(e.target).closest('.popover').length) {
			        $('.popover').each(function(){
			            $(this.previousSibling).popover('hide');
			        });
			    }
			});


		});


	});











