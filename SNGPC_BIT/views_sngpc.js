var load_modal = function(modal)
	{//RESPONSAVEL PELO MODAL DE LOAD
		$(modal).modal({backdrop: "static"});//abre o modal
	}
var fechar_load= function(modal)
	{//ENCERRA O MODAL
		$(modal).modal('hide');
	}
var tableLista = function()
	{//REPOSANVEL POR EXIBIR A TABELA NA TELA PRINCIPAL		
		$("#sngpc_column").empty();
		$.ajax(
			{		
				type:"POST", 
				url: "app/models/teste_list.php",	
				dataType: "json",	
				success: function(dados)
					{	//load_modal("#Mload");

						for(var i=0; dados.clientes.length>i; i++)
						{								
									/*setTimeout('document.location.reload(true);', 300000);*/

									var	registros = dados.clientes[i].sngpc_registro;									
									if(registros != null)
										{
											registros = registros[0];
											var statusmovimento = registros.statusmovimento;
											var movimentovazio = registros.movimentovazio;
											var importado = registros.importado;
											var mensagemerro = registros.mensagemerro;
											var tela = registros.tela;	
											var hash = registros.hash;	
											//var dados_modal = '{"nome":"'+dados.clientes[i].nome+'", "codigo":"'+dados.clientes[i].codigocliente+'","hash":"'+registros.hash+'","mensagem":"'+mensagemerro+'"}';
											
											//console.log(mensagemerro);
											if(statusmovimento == 1)
												{
													statusmovimento = 'ACEITO';													
												}
											else if(statusmovimento == 2)
					 							{
													statusmovimento = 'ERRO';
												}
											else if(statusmovimento == 3)
												{
													statusmovimento = 'Aguardando';													
												}
											else
												{
													statusmovimento = '---';
												}						
											if(movimentovazio == 1)
												{
													movimentovazio = 'SIM';
												}	
											else if(movimentovazio == 2)
												{
													movimentovazio = 'NÃO';
												}
											else
												{
													movimentovazio = '----';
												}	
									
											if(importado == 0)
												{
													importado = 'SNGPCBIT';
												}
											else if(importado == 1)
												{
													importado = 'IMPORTANDO';
												}
											if(tela==1)	
												{
													tela = 'Em Lançamento';
												}
											else if(tela ==2)
												{
													tela = 'Transmitido';
												}
											else if (tela == 3)
												{
													tela = "Inventário";
												}
											else if (tela == 4)
												{
													tela = "Retorno SNGPC";
												}
											else
												{
													tela = "---";
												}
											if(mensagemerro != "")
												{
													mensagemerro = '<button data-id="'+mensagemerro+'" class="btn-danger btn-xs" id="btnMensagem"  data-trigger="focus" data-toggle="popover" data-placement="left"data-title="<strong>'+dados.clientes[i].codigocliente+'-'+dados.clientes[i].nome+'</strong>" data-content="<p><strong>Login SNGPC:</strong> '+dados.clientes[i].LOGIN+'</p><p><strong>Senha: </strong>'+dados.clientes[i].senha+'</p><p><strong>Operador: </strong>'+registros.operador+'</p><p><strong>CNPJ: </strong>'+dados.clientes[i].cnpj+'</p><p><strong>Cidade: </strong>'+dados.clientes[i].cidade+'/'+dados.clientes[i].estado+'</p><p><strong>Build: </strong>'+dados.clientes[i].build+'</p><p><strong>Como Cadastra: </strong>'+importado+'</p>'+telefones+'"><i class="glyphicon glyphicon-envelope"></i></button>';
												}
											else
												{
													mensagemerro = '<button class="btn-default btn-xs" disabled><i class="glyphicon glyphicon-remove-sign" ></i></button>';

												}
											if(hash.length>1)
											{	
												//console.log("1 - vou colocar o butão"+dados.clientes[i].codint);
												if(statusmovimento == "ACEITO")
													{
														
														hash = '<button class="btn-default btn-xs"   disabled><i class="glyphicon glyphicon-remove-sign" disabled></i></button>';
													}
												else if (statusmovimento !="ERRO")
													{
														//console.log("2 - vou colocar o butão "+dados.clientes[i].codint+" "+statusmovimento+" "+hash);
														hash = '<button class="btn-info btn-xs" data-id="'+registros.codigocliente+'"id="btnHash"><i class="glyphicon glyphicon-refresh"></i></button>';
													}
												else
													{
														hash = '<button class="btn-default btn-xs"   disabled><i class="glyphicon glyphicon-remove-sign" disabled></i></button>';
													}												
											}
											else
											{
												hash = '<button class="btn-default btn-xs"   disabled><i class="glyphicon glyphicon-remove-sign" disabled></i></button>';
											}												
									var ordem = i;
									var tel = dados.clientes[i].telefones;
									var telefones = '';	
									for(var x = 0; tel.length>x; x++)
										{
											var telefones = telefones + '<p><strong>Telefone: </strong>'+dados.clientes[i].telefones[x].ddd +' '+dados.clientes[i].telefones[x].fone+'</p>'
										}
									$("#sngpc_column").append('<tr><td>'+ordem+'</td>\
										<td>'+dados.clientes[i].codint+' - '+dados.clientes[i].nome+'</td>\
										<td>'+dados.clientes[i].estado+'</td>\
										<td>'+registros.datainiciomovimento+'</td>\
										<td>'+registros.datafimmovimento+'</td>\
										<td>'+registros.datahj+" "+registros.hratual+'</td>\
										<td>'+movimentovazio+'</td>\
										<td>\
											<button class="btn-primary btn-xs" id="ballonContatos2'+i+'"  data-trigger="focus" data-toggle="popover" data-placement="left"data-title="<strong>'+dados.clientes[i].codigocliente+'-'+dados.clientes[i].nome+'</strong>" data-content="<p><strong>Login SNGPC:</strong> '+dados.clientes[i].LOGIN+'</p><p><strong>Senha: </strong>'+dados.clientes[i].senha+'</p><p><strong>Operador: </strong>'+registros.operador+'</p><p><strong>CNPJ: </strong>'+dados.clientes[i].cnpj+'</p><p><strong>Cidade: </strong>'+dados.clientes[i].cidade+'/'+dados.clientes[i].estado+'</p><p><strong>Build: </strong>'+dados.clientes[i].build+'</p><p><strong>'+tela+'</strong></p><p><strong>Como Cadastra: </strong>'+importado+'</p>'+telefones+'"><i class="glyphicon glyphicon-eye-open"></i></button> '+mensagemerro+" "+hash+'\
										</td>\
										<td>'+statusmovimento+'</td></tr>');
									$('#ballonContatos2'+i+'').popover({html: true, container: 'body', delay: 5, placement: 'left'});
									//$('#ballonContato'+i+'').tooltip({html: true});
									}									
						}	
						$('#sngpcTable').DataTable();				
					}		
			});
	}
var table = function()
	{//REPOSANVEL POR EXIBIR A TABELA NA TELA PRINCIPALstatusmovimento
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
$(document).ready(function() 
{

	table();

	tableLista();
	$("#conteudos").on('click','#btnHash', function(){
		var cdcliente = $(this).attr('data-id');
		$.ajax({
			type: "POST",
			url: "http://ecmsistemas.com.br/sngpc/consulta",
			dataType: "json",
			data:{codigocliente: cdcliente},
			success: function(data)
			{
				console.log(data);
				//tableLista();
			}			
			
		})

	});
	 $("#conteudos").on('click', '#btnMensagem', function()
	 	{
	 		var mensagem = $(this).attr('data-id');
	 		var mensagem_tratada = mensagem.split('[NOVA_LINHA]');
	 		$("#conteudoMensagem").empty();
	 		$("#modalMensagens").modal({backdrop: "static"});//abre o modal
	 		$("#tituloMensagem").text();	 		
	 		for(var i=0; mensagem_tratada.length>i; i++)
	 		{
	 			$("#conteudoMensagem").append('<p>'+ mensagem_tratada[i]+'</p>');
	 		}
	 		//$("#conteudoMensagem").append('<p>'+mensagem+'</p>');	 			 		
	 		//tableLista();

	 	});


});