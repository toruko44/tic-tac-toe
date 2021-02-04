new Vue({
    el:'#app',
    data: {
      masses:[
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
        {
          states:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          vic:0
        },
      ],
      playerId:1,
      winnerId2:0,
    },
    methods:{
      onSelect:function(massIndex,rowsIndex,colsIndex){
        if (this.masses[massIndex].states[rowsIndex][colsIndex] != 0) {
          alert('そのマスは、すでに選択されています！');
        }else {
          if (this.playerId == 2) {
            var number_min1 = this.count_number1();
            var number_min2 = this.count_number2();
            var number_max = this.count_number3();
            this.AiPlayer(number_min1,number_min2,number_max);
          }else {
            var states = JSON.parse(JSON.stringify(this.masses[massIndex].states))
            states[rowsIndex][colsIndex] = this.playerId;
            this.masses[massIndex].states = states;
            this.playerId = 2
          }
          for (var i = 0; i < 9; i++) {
            var winnerId = this.getWinnerId(i);
            if (winnerId != 0) {
              this.masses[i].states = [
                [winnerId,winnerId,winnerId],
                [winnerId,winnerId,winnerId],
                [winnerId,winnerId,winnerId]
              ];
              this.masses[i].vic = this.playerId;
            }else if (this.isDraw(i)) {
                this.masses[i].states = [
                  [3,3,3],
                  [3,3,3],
                  [3,3,3]
                ];
                this.masses[i].vic = 3;
              }
          }
          let winnerId2 = this.getWinnerId2();
          if (winnerId2 != 0) {
            playerIds = {
              2:'〇',
              1:'✕'
            };
            alert(playerIds[winnerId2] + 'さんの勝ちです。おめでとうございます！');
            this.winnerId2 = 0;
          }else if(this.isDraw2()) {
            alert('引き分けです！');
          }
        }
      },
      getWinnerId:function(j){
            if (this.masses[j].vic == 0) {
              for (var i = 0; i < 3; i++) {
                var row = this.masses[j].states[i];
                if (this.isStatesFilled(row)) {
                  return row[0];
                }
                var col = [
                  this.masses[j].states[0][i],
                  this.masses[j].states[2][i],
                  this.masses[j].states[1][i],
                ];
                if (this.isStatesFilled(col)) {
                  return this.masses[j].states[0][i];
                }
                var cross1 = [
                  this.masses[j].states[0][0],
                  this.masses[j].states[1][1],
                  this.masses[j].states[2][2]
                ];
                if (this.isStatesFilled(cross1)) {
                  return this.masses[j].states[0][0];
                }
                var cross2 = [
                  this.masses[j].states[0][2],
                  this.masses[j].states[1][1],
                  this.masses[j].states[2][0]
                ];
                if (this.isStatesFilled(cross2)) {
                  return this.masses[j].states[0][2];
                }
              }
            }
        return 0;
    },
        getWinnerId2:function(){
          for (var i = 0; i < 3; i++) {
            var row2 = [
              this.masses[0+(3*i)].vic,
              this.masses[1+(3*i)].vic,
              this.masses[2+(3*i)].vic
            ];
            if (this.isStatesFilled(row2)) {
              return this.masses[0+(3*i)].vic;
            }
          }
          for (var i = 0; i < 3; i++) {
            var col2 = [
              this.masses[0+i].vic,
              this.masses[3+i].vic,
              this.masses[6+i].vic
            ];
            if (this.isStatesFilled(col2)) {
              return this.masses[0+i].vic;
            }
          }
            var cross3 = [
              this.masses[0].vic,
              this.masses[4].vic,
              this.masses[8].vic
            ];
            if (this.isStatesFilled(cross3)) {
              return this.masses[0].vic;
            }
            var cross4 = [
              this.masses[2].vic,
              this.masses[4].vic,
              this.masses[6].vic
            ];
            if (this.isStatesFilled(cross4)) {
              return this.masses[2].vic;
            }
          return 0;
        },
        isStatesFilled:function(states){
          return(
            states[0] != 0 && states[0] != 3 && states[0] == states[1] && states[2] == states[1]
          );
        },
        isDraw:function(x){
          if (this.masses[x].vic == 0) {
            for (var i in this.masses[x].states){
              var row = this.masses[x].states[i];
              for (var j in row) {
                var state = row[j];
                if (state == 0) {
                  return false;
                }
              }
            }
          return true;
          }
        },
        isDraw2:function(){
          for (var i in this.masses){
            var row2 = this.masses[i].vic;
            if(row2 == 0){
              return false;
            }
          }
          return true;
        },
        restart:function(){
          for (var i in this.masses) {
            this.masses[i].vic = 0;
            this.masses[i].states = [
              [0,0,0],
              [0,0,0],
              [0,0,0]
            ];
          }
          winnerId2 = 0;
        },
        AiPlayer:function(number0,number1,number2){
          this.playerId = 2;
          if (this.masses[number2].states[number1][number0] == 1 || this.masses[number2].states[number1][number1] == 2 || this.masses[number2].states[number1][number1] == 3) {
            this.AiPlayer(this.count_number1(),this.count_number2(),this.count_number3());
          }else{
            var states = JSON.parse(JSON.stringify(this.masses[number2].states))
            states[number1][number0] = this.playerId;
            this.masses[number2].states = states;
          }
          this.playerId = 1;
          return
        },
        count_number1:function(){
          var min = 0;
          var max1 = 2;
          var number_min1 = Math.floor( Math.random() * (max1 + 1 - min) ) + min ;
          return number_min1;
        },
        count_number2:function(){
          var min = 0;
          var max1 = 2;
          var number_min2 = Math.floor( Math.random() * (max1 + 1 - min) ) + min ;
          return number_min2;
        },
        count_number3:function(){
          var min = 0;
          var max2 = 8;
          var number_max = Math.floor( Math.random() * (max2 + 1 - min) ) + min ;
          return number_max;
        }
    }
  })
  