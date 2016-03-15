$(document).ready( function() {

	$(".turn_back").click(function(){
		 history.go(-1);
	});

});

function m_hotel_comment_more() {
	var hotelId = $("#m_hotel_comment_hiddenHotelId").val();
	var rating = $("#m_hotel_comment_hiddenRating").val();
	var page = Number($("#m_hotel_comment_hiddenPage").val()) + 1;
	$.ajax({
		type : "GET",
		async : false,
		url : "/m/hotel/" + hotelId + "/listComment?rating=" + rating + "&page=" + page,
		success : function(data) {
			if(data==null || data=='') {
				pop_box_warn("已经是最后一条评论了~");
			}
			$("#m_hotel_comment_hiddenPage").val(page);
			var comments = "";
			for(var i=0; i<data.length; i++) {
				var date = new Date(data[i].createTime);
				var year = date.getFullYear();
				var month = date.getMonth();
				if(month<10) {
					month = "0" + month;
				}
				var day = date.getDate();
				if(day<10) {
					day = "0" + day;
				}
				var hours = date.getHours();
				if(hours<10) {
					hours = "0" + hours;
				}
				var minutes = date.getMinutes();
				if(minutes<10) {
					minutes = "0" + minutes;
				}
				comments += '<li><div class="comment_praise_people_icon"></div>' +
								'<div class="comment_detail_title">' + data[i].showName + '</div>' +
								'<div class="comment_detail_dec">'+ data[i].content + '</div>' +
								'<div class="comment_date"><span>' + year +'-'+month+'-'+day+' '+hours+':'+minutes + '</span></div>' +
								'<div class="comment_praise">' +
									'<div class="comment_praise_icon" onclick="addUpCount('+ data[i].id +',this)"></div>' +
									'<div class="comment_praise_number">(<span id="commentCount'+ data[i].id +'" class="">' + data[i].upCount + '</span>)</div>' +
								'</div></li>';
			}
			$(".hotel_comment_detail").append(comments);
		}
	});
}

function addUpCount(id,thisComment) {
	$.ajax({
		type : "POST",
		async : false,
		url : "/comment/addUpCount?id=" + id,
		success : function(data) {
			$(thisComment).addClass("comment_isPraised");
			if(data == 0) { //24小时内点赞过
				pop_box_warn("你已经点赞过了!");
			} else {
				$("#commentCount"+id).text(Number($("#commentCount"+id).text())+1);
			}
		}
	});
}
