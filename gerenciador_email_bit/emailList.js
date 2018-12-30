var table_emailList =  $('#emailList').dataTable(
    {
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-12 col-md-12'f>>",
        "autoWidth" : false,
        "oLanguage": {
            "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
        },
        "order": [[ 0, "desc" ]],
        "aoColumnDefs": [    
         { "aTargets": [0], "bSearchable": false,"bSortable": false,"sWidth": "100%","sTitle":"","bVisible": true},    
         { "aTargets": [1], "bSearchable": false,"bSortable": false,"sWidth": "2%","sTitle":"<i class='glyphicon glyphicon-cog'></i>","bVisible": false}
        ], 
        "scrollX": false, 
        "paging": false,                        
 		"scrollColapse": false });

function NotificationNewEmail()
{
	var consult_server = function(resultExpired= 0)
	{
		//METODO RESPONSAVEL POR ENVIAR NOTIFICACOES DE NOVAS MENSAGENS
		$.post("mainEmail.php", {"recent": "newEmail", "resultExpired": resultExpired}, function(data)
			{
				var obj = JSON.parse(data);				
				if(obj.found == "true")
				{
					NotificationSmall("Email de: "+obj.from, obj.titule, "#3276B1", "fa fa-bell swing animated", 8000);
				}
				return consult_server(obj.ultimate_number);
			});
	}

}

function BoxEmail(action = 1, folder="")
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
						"1":"teste"
						
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
/**
*
*
**/

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
