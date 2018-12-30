var id_corrent = '';
var data_corrent = '';
var header_corrent = '';
var xfolder ='';
var xaction = 1;

function consult_server(resultExpired= 0)
	{
		/*$.post("mainEmail.php", {"recent": "newEmail", "resultExpired": resultExpired}, function(data)
			{
				var obj = JSON.parse(data);				
				if(obj.found == "true")
				{
					NotificationSmall("Email de: "+obj.from, obj.titule, "#3276B1", "fa fa-bell swing animated", 8000);
				}
				return consult_server(obj.ultimate_number);
			});*/
	}
function viewNotification()
	{
		
		$("#bodyNotification").append('<ul class="notification-body" id="listNotification"></ul>');

		$.post("mainEmail.php",{"action": xaction, "folder": xfolder}, function(data)
        		{	
        				var obj = JSON.parse(data);
        				if(obj.emails == null)
	        				{
	        					console.log('SEM NEM UM EMAIL');
	        				}
        				else
	        				{	var emails =  obj.emails;
	        					var tam = emails.length;

	        					for(var x = 0; tam>x; tam--)        						
		        					{										
										var y = tam-1;
										$("#listNotification").append('<li>\
										<span class="unread">\
											<a href="javascript:void(0);" data-id="'+emails[y].UID+'" class="msg">\
												<i src="" alt="" class="glyphicon glyphicon-envelope air air-top-left margin-top-5" width="40" height="40"></i>\
												<span class="from">'+emails[y].from+'<i class="icon-paperclip"></i></span>\
												<time>'+emails[y].date+'</time>\
												<span class="subject">'+emails[y].subject+'</span>\
												<span class="msg-body" style="float: right" ><a>veja mais...</a></span>\
															</a>\
										</span></li>');
									}	        					       					
	        				}
				});      
		
	}
function NotificationSmall(titleText, textContent, Configcolor= "#A6BEFF", Icon = "fa fa-thumbs-up bounce animated" ,Configtimeout=4000, type=0)
	{ 
		if(type==0)
		{
			$.smallBox({
							title : titleText,
							content : textContent,
							color : Configcolor,
							iconSmall : Icon,
							timeout : Configtimeout
						});
		}
		else if(type==1)
			{
					$.bigBox({
						title : titleText,
						content :textContent ,
						color : Configcolor,
						timeout: Configtimeout,
						icon :Icon,
						number : "2"
					});
			}
	}
function listEmails(action = 1, folder="")
    {
    	var from = '';
    	var subject = '';
    	var date = ''; 
    	var attachment = '';         
        var attachment_check = function(emails)
        {/*ANEXOS*/
        	if(emails.attachment == null)
				{
					 attachment = '';
				}
				else if(emails.attachment != null)
				{
					 attachment =" <i class='glyphicon glyphicon-paperclip'></i>";
				}
        }
        var flagged = function(emails)
        {/*SINALIZADAS*/
        	if(emails.flagged == 1 & emails.seen==0)
        	{
        		subject = " <i class='glyphicon glyphicon-flag'></i> <strong>"+emails.subject+"</strong>";
        	}
        	else if(emails.flagged == 1 &  emails.seen==1)
        	{
        		subject = " <i class='glyphicon glyphicon-flag'></i> "+emails.subject;
        	}
        	else
        	{
        		subject = emails.subject;
        	}
        }
        var answered = function(emails)
        {/*REPONDIDAS*/
        	
        	if(emails.answered == 1 & emails.seen==0)
        	{
        		subject = "<i class='glyphicon glyphicon-share-alt'></i> <strong>"+emails.subject+"</strong>";
        		//console.log(emails);
        	} 
        	else if(emails.answered == 0 & emails.seen==1)
        	{
        		subject = "<i class='glyphicon glyphicon-share-alt'></i> "+emails.subject;

        	}
        	else 
        	{
        	   	subject = emails.subject;
        	  }   
        	//console.log(emails);

        }
         var insertLine= function(emails)
         {
         	for(var x = 0; x<emails.length; x++ )
				{
										
					//read(emails[x]);//FUNCOES PRIVADAS
					attachment_check(emails[x]);
					answered(emails[x]);
					flagged(emails[x]);
					
					if (String(subject).length> 50)
						{
							subject = subject.substring(0, 80)+"...";
						}
					if(String(from).length > 24)
						{
							from = from.substring(0,60)+"...";
						}								

					var myTable = data_newtable.DataTable().row.add(
					{
						"0": x,
						"1":"",
						"2": emails[x].from,
						"3":subject,
						"4": "<i class='glyphicon glyphicon-flag'></i>",
						"5": attachment,
						"6":emails[x].date,
						"7":emails[x].position,
						"8":emails[x].UID,
						"9": 0
					}).draw().node();
					if(emails[x].seen == 0)
						{
							$(myTable).addClass('notRead');
						}
				}
         }
        this.checkEmail = function()
        {
        	$.post("mainEmail.php",{"action": action, "folder": folder}, function(data)
        		{	
        				var obj = JSON.parse(data);

        				if(obj.emails == null)
        				{
        					//console.log('SEM NEM UM EMAIL');
        				}
        				else
        				{
        					insertLine(obj.emails);
        					linkfolder(obj.folders);
        				}
				});            
        }
    } 

function effectsDbclick(before=1, tr=null)
	{
		if(before == 1)
			{
				$("#chats").removeClass('hide');
				$("#emailXBody").empty();
				$("#emailXBody").html('<img id="loadimg" src="img/load_email.gif">');	
			}
		else
			{			 
				$("#emailXBody").empty();
				var teste = $(tr).children();
			}	
	}
String.prototype.stripHTML = function() {return this.replace(/<.*?>/g, '');}
function linkfolder(data)
{	$("#listFolders").empty();
	for(var x = 0; data.length>x; x++)
	{		
		$("#listFolders").append("<li><a href='javascript:void(0);' id='"+data[x].host+"'>"+data[x].folder+"</a></li>");
	}
}
function clearBoxSend()
{
	$("#bodyToEmail").val('');
		$("#tosendEmail").val('');
		$("#sendCCO").val('');
		$("#sendSubject").val('');
}

$("#data_newtable tbody").on('dblclick', 'tr', function()
    {   
        if ( $(this).hasClass('selected') ) 
            {
                 $(this).removeClass('selected');
            }
        else 
            {
               $("#data_newtable").DataTable().$('tr.selected').removeClass('selected');                       
               $(this).addClass('selected');  
               $(this).removeClass('notRead');
               var send_box = $("send_box").hasClass('hide');
               //console.log(send_box);
               if(send_box == false)
	               {
	               		$("#send_box").addClass('hide');
	               }

				row = $("#data_newtable").DataTable().row(this).data();	
				id = row[8];		
				effectsDbclick();
				$("#contentModal").empty();
				$(".modal-title").empty();
				$("footer_content").empty();				
				
				$.post("mainEmail.php", {"action": xaction,"parameter": "open","folder": xfolder, "id": id}, function(data, result)
					{	
						if(result =="success")
						{	
							data_corrent = data;//global
							id_corrent = id;//global
							effectsDbclick(2, row);
							$("#emailXBody").html(data);	
							var teste = row[2].stripHTML();
							$("#head_modal").text(row[2]);	
							//console.log('teste: '+data);
							$.post("mainEmail.php", {"action":xaction,"id": id, "parameter": "attachment"}, function(head, result)
								{							
									if(result == "success")
									{	//console.log(head);									
										header_corrent = JSON.parse(head);

										var attachments = header_corrent.attachments;
										var verifyArray = Array.isArray(attachments);
										if(verifyArray == true)
										{
											var tam = attachments.length;
											$("#chat_attachments").empty();
											for(x =0 ;tam>x; x++ )
											{
												$("#chat_attachments").append('<li><a href="'+attachments[x].link+'">'+attachments[x].filename+'</a></li>');
												//console.log(attachments[x].filename);
											}
										}
									}

								});

						}
					});
			}              
    });
     
$(document).ready(function() 
	{
		consult_server();
		 $("#data_newtable tbody").on('click', 'tr', function()
    	{/*CLICK PARA OCULAR OPCOES*/
    	
    	
    	if( $(this).hasClass('selectedX') ) 
            {
                 $(this).removeClass('selectedX');
            }
        else 
            {
				$("#data_newtable").DataTable().$('tr.selectedX').removeClass('selectedX');                       
				$(this).addClass('selectedX');  								
			} 
	
   		 }); 

		$("body").on('click', '.header_window', function()
			{		
				var next = $(this).next();
				next.toggle();
			});
		$("#minimize").on("click", function()
		{
			var next = $(".header_window").next();
			next.toggle();
		});	 
		$("#resize").on("click", function()
			{	 $("#box").fadeOut();
		
				//$("#box").addClass('hide');
				
				$("#boxEmail").removeClass('hide');
				$("#boxEmail").fadeIn();
				$("#chats").addClass('hide');
				$("#myModal").modal();

				$("#contentEmail").html(data_corrent);
				$("#titleEmail").text(header_corrent.head.Subject);
				$("#headEmail").text(header_corrent.head.Subject);
				$("#labelHeader_from").text(header_corrent.head.fromaddress);
				$("#labelHeader_to").text(header_corrent.head.to[0]['personal']);
				$("#labelHeader_date").text(header_corrent.head.date);
				if(header_corrent.attachments != null)
					{
						var attachments = header_corrent.attachments;
						var tam = attachments.length;
						$("#attachments").empty();
						for(x =0 ;tam>x; x++ )
							{
								$("#attachments").append('<li><a href="'+attachments[x].link+'">'+attachments[x].filename+'</a></li>');
								//console.log(attachments[x].filename);
							}
					}
				//console.log(header_corrent.head.to);			
			});
		$("#closeChat").on("click", function()
			{
				$("#chats").addClass('hide');
			});
		$("#updateTable").on("click", function()
		{	 
			var clear_table = $("#data_newtable").DataTable().clear().draw(false);	
			var table = new listEmails(xaction, xfolder);
			table.checkEmail();
		});
		$("#btnbacklist").on("click", function()
			{	 
				var clear_table = $("#data_newtable").DataTable().clear().draw(false);					
				var table = new listEmails();
				table.checkEmail();
				$("#boxEmail").fadeOut('show', function() {
					$(this).addClass('hide');
					$("#box").removeClass('hide');
				});
				$("#box").fadeIn('400');				
			});
		$("#newEmail").on('click', function()
		{
			var chatBox = $("#chats").hasClass('hide');
			if(chatBox == false)
				{
					$("#chats").addClass('hide');
				}
		$("#send_box").removeClass('hide');
		clearBoxSend();

		});
		$("#btnToSend").on('click', function()
		{
			var bodyToEmail = CKEDITOR.instances.bodyToEmail.getData();
			//var bodyToEmail = $("#bodyToEmail").val();
			//var bodyToEmail = bodyToEmail.replace(/(\n)/, "</p><p>");
			var tosendEmail = $("#tosendEmail").val();
			var sendCCO = $("#sendCCO").val();
			var sendSubject = $("#sendSubject").val();
			$.post("mainEmail.php", {to: tosendEmail , toName: null ,ToCoo: sendCCO,toSubject: sendSubject, toBody: bodyToEmail , toAttachment: null, parameter:"send"}, function(data, result)
				{
						clearBoxSend();						
						$("#send_box").addClass("hide");
						if(data == 1)							
						{ 	var contentMsg =  'Enviado para: '+tosendEmail+' ';
							NotificationSmall('Email enviado com sucesso!', contentMsg);
							swal({
                                    title: "Tabela Criada com Sucesso!",
                                    type: "success",
                                    text: "",
                                    timer: 2000,
                                    showConfirmButton: false
                                    });                                   
                                    
						}
						else
						{
							NotificationSmall(':( 	 Ocorreu um erro no envio!', data, '#C46A69', "glyphicon glyphicon-thumbs-down",5000);
						}
					var clear_table = $("#data_newtable").DataTable().clear().draw(false);	
					var table = new listEmails();
					table.checkEmail();

				});
		});
		$("#btnTableselectedtrash").on("click", function()
			{
				var selectedTable = $("#tbody tr").hasClass('selectedX');
				
				if( selectedTable !=true )
					{
						NotificationSmall('Ops!', 'Você não selecionou o que deseja excluir.', '#C46A69', "glyphicon glyphicon-thumbs-down",5000);
					}
				else
					{
						row = $("#data_newtable").DataTable().row('.selectedX').data();
						var id = row[8];
						$("#data_newtable").DataTable().row('.selectedX').remove().draw( false );	
						$.post('mainEmail.php',{"action":xaction,"parameter":"delete","id":id}, function(data, result)
							{						  	
							  	if(result =="success")
								  	{
								  		NotificationSmall('Exclusão!', 'Email ( '+row[2]+' ) foi excluido com sucesso!', '#C46A69');							  		
								  	}
							});
					}
			});
		$("#btnTableanswer").on('click',  function()
		 { 
		 	var box_running = $("#send_box").hasClass('hide');
		 	if(box_running != true)
			 	{

			 	}
		 	else
			 	{
			 		row = $("#data_newtable").DataTable().row('.selectedX').data();
			 		$("#bodyToEmail").val(data_corrent);
					$("#tosendEmail").val(row[2]);
					$("#sendCCO").val('');
					$("#sendSubject").val('Re'+row[3]);
					$("#send_box").removeClass('hide');
				}
			
		});
		$("#listFolders").click((e) => 
		{
  					xfolder = e.target.id;
  					xaction = 'open';
  					var clear_table = $("#data_newtable").DataTable().clear().draw(false);	
					var table = new listEmails('open', e.target.id);
					table.checkEmail();

  				
  			//le.log(e.target.id);
		});
		
$("#btnNotificationEmail").on("click", function()
	{
		$("#bodyNotification").empty();
		viewNotification();

	});
/*-------------------------------*/
      var editor = CKEDITOR.replace( 'bodyToEmail', {
                           toolbar:
                           [
                             { name: 'basicstyles', items : [ 'Bold','Italic','Underline' ] },
                             { name: 'paragraph', items : [ 'NumberedList','BulletedList' ] },
                             { name: 'paragraph', items : [ 'JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'] },                             
                             { name: 'links', items : [ 'Link','Unlink','Anchor' ] }
                           ],
                           width: "490px",
                           height: "210px",
                       }
                         ); 
CKEDITOR.config.removePlugins = "elementspath";
CKEDITOR.config.resize_enabled = false; 
/*function setCKEditorToTextarea() {
        for(var instanceName in CKEDITOR.instances)
          CKEDITOR.instances[instanceName].updateElement();            
      } 
/*
CKEDITOR.replace( 'editor1', {enterMode: Number(2)});  */
/*
config.removeDialogTabs = 'link:advanced';
	config.toolbarLocation = 'bottom';
	config.uiColor = '#FFFFFF';
*/
   

/*-------------------------------*/		
		$(this).keydown(function(e)
			{
				/*console.log(e.keyCode);
			  	console.log(e.which);
			  	console.log(e.shiftKey);
			  	console.log(e.ctrlKey);*/
			  	  	if(e.keyCode == 46 | e.which == 46 & e.shiftKey != true & e.ctrlKey != true )
					  	{					  	
						  var row = $("#data_newtable").DataTable().row('.selectedX').data();
						  var id = row[8];
						  $("#data_newtable").DataTable().row('.selectedX').remove().draw( false );	
						  $.post('mainEmail.php',{"action":xaction, "parameter":"delete","id":id}, function(data, result)
						  {						  	
							  	if(result =="success")
								  	{
								  		//NotificationSmall('Exclusão!', 'Email ( '+row[2]+' ) foi excluido com sucesso!');
								  		NotificationSmall('Exclusão!', 'Email ( '+row[2]+' ) foi excluido com sucesso!', '#C46A69');
								  		
								  	}
						  });			  	
						 //var table = new listEmails();
						//table.checkEmail();
						}

					else if(e.shiftKey == true)
						{
							$("#data_newtable tbody tr").on("click", function()
								{	
									//console.log(e.shiftKey);
									$(this).addClass('selectedMulti');
								});

						}

				
			});
		
	});    //http://stackoverflow.com/questions/4705848/rendering-html-inside-textarea