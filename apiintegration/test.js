var axios = require('axios');
var data = {};

    

            var config = {
            method: 'get',
                url: 'https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages',
                    headers: {
                    
                        'Content-Type': '',
                            
                                
                                    'Authorization': 'Bearer ya29.A0AfH6SMB4Fkl1pqFHEoOOuvoI8QxcdumvsADr5lTKZPeI6u8rmK10S5Nwch-Erugwrwdl2SxY22zLVS5J63lQ1iOMsvxy0O_PNRYcSIuqpUSwKU4TXvfwoht0mXkCXJIQaumT6qws7SUoqigzA4JEn6LQxYZF'
                                        },
                                        data : data
                                        };

                                        axios(config)
                                        .then(function (response) {
                                        res.send(JSON.stringify(response))
                                        })
                                        .catch(function (error) {
                                        res.send(JSON.stringify(error))
                                        });