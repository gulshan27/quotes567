var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {	fetch('quotes', 
	{
    	method: 'put',
    	headers: {'Content-Type': 'application/json'},
    	body: JSON.stringify({
      		'name': 'Gulshan',
      		'quote': 'Ha-ha, I have the power to replace anything.'})

  	})
  
  	.then(response => {
    if (response.ok) return response.json()
  	})
  
  	.then(data => {
    console.log(data)
    window.location.reload(true)
  	})
  })

  	

  	del.addEventListener('click', function () {
  	  fetch('quotes', {
  	    method: 'delete',
  	    headers: {
  	      'Content-Type': 'application/json'
  	    }
  	    
  	  }).then(function (response) {
  	    window.location.reload()
  	  })
  	})

