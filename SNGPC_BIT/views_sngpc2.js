/*https://urin.github.io/jquery.balloon.js/index.html*/
var aux_time = '';
var dados_table1 = [];
var data_atual_hj = '';
var load_modal = function(modal){/*RESPONSAVEL PELO MODAL DE LOAD */ $(modal).modal({backdrop: "static"});/*abre o modal*/ }
var fechar_load = function(modal) {/*ENCERRA O MODAL*/ $(modal).modal('hide'); }
var calcula_data = function(data,data_atual)
	{
		if(data.length<8)
			{
				var total = "N";

			}
		else
			{
				date1 = new Date(data);
				date2 = new Date(data_atual);
				var diferenca = Math.abs(date1 - date2); //diferença em milésimos e positivo
				var dia = 1000*60*60*24; // milésimos de segundo correspondente a um dia
				var total = Math.round(diferenca/dia); //valor total de dias arredondado 
			}
		return total;
	}
function salvar_obs(id_obs)
{		
 	$.post("app/models/salvar.php",{funcao:id_obs,codigo:id_obs},function(result){
 		console.log(result);
 		var view_obs = jQuery.parseJSON(result);
 		if (view_obs != '')
	 		{
	 			$("#tituloMensagem").append('<div class="panel panel-primary" id="panelObs"><div class="panel-heading">'+view_obs["login"]+'</div><div class="panel-body">'+view_obs["obs"]+'</div></div>');
	 		}
 	});	
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
var configLinha = function(val, objHash, objTelefone,ultimo_movimento_aceito,build,obs)
	{
		
		if(obs != null && obs != "")
		{
			var btnMensagens = '<a id="btnMensagens" type="button" class="btn-outline btn-warning btn-sm"><i class="glyphicon glyphicon-comment"></i></button>';
		} 
		else
		{
			var btnMensagens = '<a id="btnMensagens" type="button" class="btn-outline btn-info btn-sm"><i class="glyphicon glyphicon-folder-close"></i></button>';
		}
		//var btnMensagens = '<button id="btnMensagens" type="button" class="btn-outline btn-info btn-sm"><i class="glyphicon glyphicon-envelope"></i></button>';
		var btnConsultaSNGPC = '<a id="btnConsultaSNGPC" type="button" class="btn-outline btn-danger btn-sm"><i class="glyphicon glyphicon-refresh" aria-hidden="true"></i></button>';
		//var btnObservacao = '<a tabindex="0" id="btnObservacao" data-trigger="click" data-container="body" data-toggle="popover" data-placement="left" type="button" class="btn-outline btn-success btn-sm"><i class="glyphicon glyphicon-pencil" aria-hidden="true"></i></button>';	
		var btnBloqueado = '<a  id="btnBloqueado" type="button" class="btn-outline btn-secondary btn-sm" disabled><i class="glyphicon glyphicon-remove"></i></button>';
		//console.log(val[5]);
		var aviso_dias = calcula_data(ultimo_movimento_aceito,data_atual_hj);
		var  aviso_colum = aviso_dias;
		aviso_colum = aviso_colum - 1; // aqui é para subtrair o dia de hoje
		//if(aviso_colum <= 1){
			//aviso_colum = 'Em dia!';
			//aviso_colum = '<strong style="color:green;">'+aviso_colum+'</strong>';
		//}
		//var aviso_colum = '1'
		//var aviso_dias = '1';
		dataformatada = ultimo_movimento_aceito.split('-');
		//console.log(aviso_dias);
		if(aviso_dias <= 7)
			{
				 aviso_dias = "Movimento em dia com ANVISA!";
			}
		else
			{
				aviso_dias = "Data final do ultimo movimento aceito "+dataformatada[2]+"/"+dataformatada[1]+"/"+dataformatada[0];
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
					//val[5] = '<i data-toggle="tooltip" data-placement="Right" title=" '+aviso_dias+'" class="glyphicon glyphicon-dashboard"></i>  '+val[5];
					if(aviso_colum <= 7){
						val[0] =  '<strong style="color:green;">'+val[0]+'</strong>';
						val[1] =  '<strong style="color:green;">'+val[1]+'</strong>';
						val[2] =  '<strong style="color:green;">'+val[2]+'</strong>';
						val[3] =  '<strong style="color:green;">'+val[3]+'</strong>';
						val[4] =  '<strong style="color:green;">'+val[4]+'</strong>';
						val[5] =  '<strong style="color:green;">'+val[5]+'</strong>';
						val[6] =  '<strong style="color:green;">'+val[6]+'</strong>';
						val[7] =  '<strong style="color:green;">'+val[7]+'</strong>';
						val[8] =  '<strong style="color:green;">'+val[8]+'</strong>';
						val[10] =  '<strong style="color:green;">'+val[10]+'</strong>';
						val[11] =  '<strong style="color:green;">'+val[11]+'</strong>';
						}
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
		$("#sngpc_column").append('<tr"id="'+val[1]+'"><td class="hide">'+val[0]+'</td><td style="width: 20%">'+val[1]+' - '+val[2]+'</td><td style="width: 7%">'+val[3]+'</td><td>'+val[4]+'</td><td>'+val[5]+'</td><td>'+val[6]+' '+val[7]+'</td><td>'+val[8]+'</td>\
		<td ><a data-toggle="tooltip" data-placement="Right" title=" '+aviso_dias+'" href="#" >'+aviso_colum+'</a></td><td>'+val[11]+'</td><td>'+btnMensagens+' '+btnConsultaSNGPC+'</td>\
		<td style="width: 10%">'+val[9]+'</td><td>'+build+'</td></tr>');
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
				configLinha(val, obj.clientes[i].sngpc_registro[0].hash, obj.clientes[i].telefones,obj.clientes[i].ultimo_dia_aceito,obj.clientes[i].build,obj.clientes[i].obs);				
			}					
			$('#sngpcTable').DataTable(	{
				 //"lengthMenu": [[6, 25, 50, -1], [6, 25, 50, "All"]],
				 scrollY: '60vh',
				 scrollColapse: false,
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
		var obj = jQuery.parseJSON(data);
		data_atual_hj = obj.data_atual;	
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
						
						if(dados_table1[i].obs != obj.clientes[i].obs && obj.clientes[i].obs != "null")
						{
								
							//var usuario = jQuery.parseJSON(teste);
							var titulo = "OBSERVAÇÃO";
							var corpo = 'Nova Observação no cliente '+obj.clientes[i].codigocliente+"-"+obj.clientes[i].nome; 
							notify(corpo, titulo);
							break;
						}						
							if(onde =="1") 
								{
									var titulo = 'ABRIU O SISTEMA';
									var corpo = "Cliente: " +obj.clientes[i].codigocliente+"-"+obj.clientes[i].nome + " ultimo movimento foi: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
									//console.log(corpo);
									notify(corpo, titulo);
									break;
								}
							else if(onde =="2")
								{
									var titulo = 'ENVIO DE MOVIMENTO';
									var corpo = "Cliente: " +obj.clientes[i].codigocliente+" -"+obj.clientes[i].nome + " Acabou de enviar o movimento: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
									//console.log(corpo);
									notify(corpo, titulo);
									break;
								}
							else if(onde =="3") 
								{
									var titulo = 'ENVIO DE INVÉNTARIO';
									var corpo = "Cliente: " +obj.clientes[i].codigocliente+" -"+obj.clientes[i].nome + " Invétario: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
									//console.log(corpo);
									notify(corpo, titulo);
									break;
								}							
							else if(onde =="4") 
								{
									var titulo = 'RETORNO DO SNGPC';
									var corpo = "Cliente " +obj.clientes[i].codigocliente+" -"+obj.clientes[i].nome + " Retorno SNGPC: " + obj.clientes[i].sngpc_registro[0].datainiciomovimento +" á "+ obj.clientes[i].sngpc_registro[0].datafimmovimento;
									//console.log(corpo);
									notify(corpo, titulo);
									break;
								}

				}
				
				//console.log(obj);	
				//timeout: 30000
				getContent(obj.ultimo_alterado);
		}
		console.log(dados_table1[0].sngpc_registro[0].mensagemerro);
				
	});
}

/*METODO PRINCIPAL*/
$(document).ready ( function ()
{	
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
			//console.log(idTable, cdcliente );
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
		 		$("#tituloMensagem").append('<p id="codigo_obs" class="hide">'+cliente.codigocliente+'</p>');
		 		$("#conteudoMensagem").empty();
		 		$('#comment').removeAttr("disabled");
		 		$('#observacao').val('');
		 		$('#btnsalvarobservacao').removeAttr("disabled");
		 		$('#comentAlert_sucesso').addClass('hide');
		 		$('#comentAlert_obs').addClass('hide');
		 		$('#observacao').removeAttr("disabled");
		 		load_modal("#modalMensagens");
		 		var codigo = cliente.codigocliente;
		 		salvar_obs(codigo);	
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
			 	

		 		$.ajax(
		 		{		
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
	$("#contentObservacao").on('click','#btnsalvarobservacao', function() 
		{
			var login = $('#login').text();
			var codigo = $('#codigo_obs').text();
			var observacao = $('#observacao').val();
		    if(observacao !="" && observacao.length >=10)
		    {  
		   	 $("#comentAlert_obs").addClass('hide'); 
			    $.ajax(
			    {
			        type: "POST",
			        dataType: "json",
			        url: "/sngpc/app/models/salvar.php",
			        data: {"observacao":observacao,"login":login,"codigo":codigo},
			        beforeSend: function()
			        {
			        	$("#divcomment_obs").addClass('hide');
			        	$("#comment_gif_obs").removeClass('hide');
			        },
			        complete: function() 
				        {
				        	$("#comment_gif_obs").addClass('hide');
				        	$("#divcomment_obs").removeClass('hide');
				            $('#observacao').attr("disabled", "disabled");
				            $('#btnsalvarobservacao').attr("disabled", "disabled");
				            $("#comentAlert_sucesso").removeClass('hide');
				            $("#panelObs").remove();

				            salvar_obs(codigo);
				        } 
				});
		  } 
		  else
		  {
		  	$("#comentAlert_obs").removeClass('hide');
		  }
		});

});