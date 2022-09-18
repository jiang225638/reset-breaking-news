$(function() {
    let newsUrl = 'http://www.liulongbin.top:3007'
    // 注册和登录切换
    $('#link_login').on('click',function() {
        $('.login').hide()
        $('.register').show()
   })

   $('#link_register').on('click',function() {
        $('.login').show()
        $('.register').hide()
})

    // 获取登录表单数据，并通过接口获取返回值
    $('#form_login').on('submit',function(e) {
        e.preventDefault()
        let loginStr = $(this).serialize()
        // console.log(loginStr);
        $.ajax({
             method:'POST', 
             url:`${newsUrl}/api/login`,
             data:loginStr,
             success:function(res){
             //   console.log(res);
             if(res.status !== 0) return layer.msg(res.message)
             layer.msg('登录成功')
             localStorage.setItem(res.token)
             location.href = '/index.html'
            }
        })
    })

    // 获取注册表单数据，并通过接口获取返回值
    $('#form_register').on('submit',function(e) {
        e.preventDefault()
        let loginStr = $(this).serialize()
        // console.log(loginStr);
        $.ajax({
            method:'POST', 
            url:`${newsUrl}/api/reguser`,
            data:loginStr,
            success:function(res){
              console.log(res);
            if(res.status !== 0) return layer.msg(res.message)
            $('#link_register').click()
            layer.msg('注册成功！请登录！')
           }
       })
    })


    // 验证规则
    form.verify({
        username: function(value, item){ 
          //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });   


})