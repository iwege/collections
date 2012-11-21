var BM = {
  doit:function(){

    this.$el = $('<div/>').html($('#bookmarks').val()).find('> dl');
  
   this.obj =  this.parser(this.$el);
   this.reformat();
  },
  parser:function($el){
    var tmp = {};
    tmp.children = {};
    tmp.children.length = 0;
    tmp.folder = 1;
    var $dts = $('> dt',$el);
    var self = this;
  
    $dts.each(function(i,item){
      
      var $item = $(item);
      if($('> h3',$item).size()){
        tmp.children[$('> h3',$item).text()] = self.parser($item.find('> dl'));
        tmp.children[$('> h3',$item).text()].title = $('> h3',$item).text();
        tmp.children[$('> h3',$item).text()].addDate = $('> h3',$item).attr('ADD_DATE');
        tmp.children[$('> h3',$item).text()].lastModified = $('> h3',$item).attr('LAST_MODIFIED');
        tmp.children.length ++;
      }else{
        $('> a',$item).each(function(i,link){
          var childNode = {};
          childNode.title = $(link).text();
          childNode.href = $(link).attr('href');
          childNode.addDate = $(link).attr('ADD_DATE');
          childNode.lastModified = $(link).attr('LAST_MODIFIED');
          tmp.children[link] = childNode;
          tmp.children.length ++;
        });

      }
    });
    return tmp;
  },
  reformat:function(){
    var rn = "\r\n";
    var ret = '<!DOCTYPE NETSCAPE-Bookmark-file-1> '+rn;
    ret  += '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"> '+rn;
    ret  +='<!--This is an automatically generated file. '+rn;
    ret  +='It will be read and overwritten. '+rn;
    ret  +='Do Not Edit! --> '+rn;
    ret  +='<TITLE>Bookmarks</TITLE> '+rn;
    ret  +='<H1>Bookmarks</H1>'+rn; 
    var obj = this.obj;
    var child = function(obj,lv){
   
      if (obj.title) {
      return blank(lv)+ '<DT><A HREF="'+obj.href+'"'+(obj.addDate?' ADD_DATE="'+obj.addDate+'"':'')+'>'+obj.title+'</A>'+rn; 
      }
      return '';
    }
     var blank = function (num) {
          num = num * 4;
          for(var i=0, str = ''; i < num; i++) str += ' ';
          return str;
     };

    var folder = function(obj,lv){
      var html = '';
      if (obj.title) {

      html += blank(lv)+ '<DT>';
      
      html += '<H3  '+(obj.addDate?' ADD_DATE="'+obj.addDate+'"':'');
      if (obj.title == 'Bookmarks Bar') {
        html += ' PERSONAL_TOOLBAR_FOLDER="true"';
      }
        html+= '>' + obj.title+'</H3>' + rn; 
      }
      html += blank(lv)+  '<DL><p>' +rn;
      for(var i in obj.children){
        var tmp = obj.children[i];
        if (tmp.folder) {
        
          html += folder(tmp,lv+1);
        }else{
          html += child(tmp,lv+1);
        }
      }
      html += blank(lv)+ '</DL><p>' + rn;
      return html;
    };
    ret += folder(obj,0);
    console.log(ret);
  }
}

$('button').on('click',BM.doit.bind(BM))