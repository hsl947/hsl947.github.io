/**
 * 修改jQuery.validate的默认设置参数
 * 加入bootstrap样式相关内容
 */
$.validator.setDefaults({
    errorElement: 'span',
    errorClass: 'help-block',
    ////结合bootstrap实现效果
    highlight: function (element) {
        /////closest() 方法获得匹配选择器的第一个祖先元素
        $(element).closest('.form-group').addClass('has-error');
    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
    },
    errorPlacement: function (error, element) {
        element.parent('div').append(error);
    }
});

// 手机号码验证
$.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

$(function () {
    $("#mainForm").validate({
        rules: {
            userName: {
                required: true,
                rangelength: [2, 13]
            },
            nickName: {
                required: true,
                minlength: 1
            },
            pwd: {
                required: true,
                digits: true,
                minlength: 6
            },
            chkPwd: {
                equalTo: "#pwd"
            },
            name: { required: true },
            email: { email: true, required: true },
            mobile: { isMobile: true, required: true },
            birthday: { required: true, dateISO: true }
        },
        messages: {
            userName: {
                required: "用户名不能为空",
                rangelength: '用户名长度必须在2-13位'
            },
            nickName: {
                required: "昵称不能为空",
                minlength: '昵称最小为1位'
            },
            pwd: {
                required: "密码不能为空",
                digits: '密码必须为数字',
                minlength: '密码最小长度为6位'
            },
            chkPwd: {
                required: "密码不能为空",
                digits: '密码必须为数字',
                equalTo: '两次输入密码不一致'
            },
            name: {
                required: "姓名不能为空",
                minlength: 2
            },
            email: {
                email: "邮箱格式错误",
                required: "邮箱不能为空"
            },
            mobile: {
                isMobile: "手机号格式错误",
                required: "手机号不能为空"
            },
            birthday: {
                required: "出生年月不能为空",
                dateISO: "出生年月格式错误"
            }
        },
        submitHandler: function () {
            ////提交到服务器端
            /****
             * $.post 参数一 请求地址，参数二 传递的数据，参数三 成功后回掉函数
             */
            // $('#subBtn').attr('disabled', true);
            $.post($("#mainForm").attr("action"), $("#mainForm").serialize(), function (res) {
                console.log(res);
                if (res.status == "y") {
                    // alert(res.msg);
                    window.location.href = $('#redirectUrl').val();
                }
                else {
                    alert(res.msg);
                    // $('#subBtn').removeAttr('disabled');
                }
            })
        }
    });
});