Object.defineProperty(Array.prototype, 'chunck_element', {
    value: function(chunkSize) {
      var array = this;
      return [].concat.apply([],
        array.map(function(elem, i) {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
      );
    }
  });

jQuery(function($){

    /*STARTING CALENDER CODING*/
    var theDate = new Date(),
        index = 0;
    let monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ],
        weekdays = ['Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        //FUNCTION FOR GET MONTH DAYS NUMBER
    let getDaysInMonth = function(year,month) {
       return new Date(year, month, 0).getDate();
      };
      
      $('.content p').html(monthNames[0]);
     $('.content-ul-li table tbody').html(getDays(getDaysInMonth(theDate.getFullYear(), index + 1), index + 1));
     $('.content-ul-li table tbody').prepend('<tr style="width: 100%; height: 1rem;"></tr>');
     //RIGHT ARROW FUNCTION 
      $('.calender-content-child .arrow-right').on({
          'click':function(){
            index++;
            if(index >= 12) {
                index = 0;
            }
              $('.content p').html(monthNames[index]);
              $('.content-ul-li table tbody').html(getDays(getDaysInMonth(theDate.getFullYear(), index + 1), index + 1));
              $('.content-ul-li table tbody').prepend('<tr style="width: 100%; height: 1rem;"></tr>');
              getResult();
          }
      });
      //LEFT ARROW FUNCTION
      $('.calender-content-child .arrow-left').on({
        'click':function(){
          index--;
          if(index == -1 || index < 0) {
              index = 11;
          }
          $('.content-ul-li table tbody').html(getDays(getDaysInMonth(theDate.getFullYear(), index + 1), index + 1));
          $('.content-ul-li table tbody').prepend('<tr style="width: 100%; height: 1rem;"></tr>');
          $('.content p').html(monthNames[index]);
          getResult();
        }
    });

    //GET TR FROM DAYS
    function getDays(number = 0, month = 1) {
        let numberArr = [];
        //ADDING NUMBER TO ARRAY
        for (let i = 1; i <= number; i++){
            numberArr.push(i);
        }
        //CHUNK ELEMENTS 
        let arrChunck = numberArr.chunck_element(7);
        let trContent = '';
        for(let x = 0; x < arrChunck.length; x++) {
            trContent += '<tr data-month="'+month+'">';
            for(let y = 0 ; y < arrChunck[x].length; y++) {
                trContent += '<td data-content="'+arrChunck[x][y]+'" data-day= "'+ (y) +'">';
                trContent += arrChunck[x][y];
                trContent += '</td>';
            }
            trContent += '</tr>';
        }
        return trContent;
    }
    //CHECK YOUR DAY 
    let dateArr =
                {
                    day: theDate.getDate(),
                    month: theDate.getMonth(),
                    weekDay:  theDate.getDay(),
                    year: theDate.getFullYear(),
                    hour: theDate.getHours(),
                    status: 'am'
                };

    function getResult(){
        $('.content-ul-li table tbody tr  td').each(function() {
            $(this).on({
                'click': function(){
                    let currentDay = '';
                    $(this).toggleClass('td-active').siblings().removeClass('td-active');
                    $(this).parent().siblings().find('td').removeClass('td-active');
                    if($(this).hasClass('td-active')) {
                        currentDay = $(this).data('content');
                    } else {
                        currentDay = null;
                    }
                    dateArr.day = currentDay;
                    dateArr.month = $(this).parent().data('month');
                    dateArr.weekDay = $(this).data('day');
                    dateArr.year = theDate.getFullYear();
                }
            });
        });
    }
    getResult();

    $('.set-date-time span').on({
        'click':function(){
            let hourIn  = $('#hourInput').val(),
                getAmPm = $('#getAmPm').val();
                dateArr.hour = hourIn;
                dateArr.status = getAmPm;
                console.log(dateArr);
                $('.calender-section #result-input').val(weekdays[dateArr.weekDay] + ' ' + dateArr.day +'th' + ' of ' + monthNames[dateArr.month - 1] + ' ' + dateArr.year + ' ' + (dateArr.hour < 10 ?  '0' + dateArr.hour : dateArr.hour) + '' + ':00:00' + ' ' + dateArr.status );
                $('.calender-content-child').removeClass('calender-active');
        }
    });

    $('.calender-icon p').on({
        'click': function() {
            $('.calender-content-child').addClass('calender-active');
        }
    });
    /*ENDING*/
});