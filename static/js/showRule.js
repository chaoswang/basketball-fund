function showRule(id, tips) {
    var alert = document.getElementById("rule1");
    if(alert!=null) {
        return false;
    }
    var placeholder = document.createElement("div");
    placeholder.setAttribute("id", id);
    placeholder.setAttribute("class", "alert alert-success alert-dismissable");
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "alert");
    closeButton.setAttribute("aria-hidden", "true");
    var buttonText = document.createTextNode("×");
    closeButton.appendChild(buttonText);
    var ruleText = document.createTextNode(tips);
    placeholder.appendChild(closeButton);
    placeholder.appendChild(ruleText);
    var row1 = document.getElementById("row1");
    var row2 = document.getElementById("row2");
    row1.insertBefore(placeholder, row2);
}

function activeIncome() {
    var income = document.getElementById("income");
    income.setAttribute("class", "active");
    var pay = document.getElementById("pay");
    pay.setAttribute("class", "");
}

function activePay() {
    var pay = document.getElementById("pay");
    pay.setAttribute("class", "active");
    var income = document.getElementById("income");
    income.setAttribute("class", "");
}

function addMember() {
    var memberName = document.getElementById("input2").value;
    var memberList = document.getElementById("memberList");
    var addMember = document.getElementById("addMember");
    var placeholder = document.createElement("div");
    placeholder.setAttribute("class", "checkbox");
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "memberName");
    var checkboxText1 = document.createTextNode(memberName);
    div1.appendChild(checkboxText1)
    var div2 = document.createElement("div");
    div2.setAttribute("class", "memberMoney");
    var checkboxText2 = document.createTextNode(100);
    div2.appendChild(checkboxText2)
    label.appendChild(input);
    label.appendChild(div1);
    label.appendChild(div2);
    placeholder.appendChild(label);
    memberList.insertBefore(placeholder, addMember);
}

// function submitToServer() {
//     var memberList = document.getElementsByClassName("checkbox");
//     var memberInfo = "";
//     for(var i=0; i<memberList.length; i++){
//         var labelNode = memberList[i].getElementsByTagName("label")[0];
//         memberInfo += labelNode.lastChild.nodeValue;
//     }
//     alert(memberInfo);
//     var logList = document.getElementById("logList").innerHTML;
//     alert(logList);
// }

function getMemberInfo() {
    var memberList = document.getElementsByClassName("memberName");
    var moneyList = document.getElementsByClassName("memberMoney");
    var memberInfo = "{";
    for (var i = 0; i < memberList.length; i++) {
        memberInfo += "\"";
        memberInfo += memberList[i].innerText;
        memberInfo += "\":";
        memberInfo += moneyList[i].innerText;
        if (i != memberList.length - 1) {
            memberInfo += ",";
        }
    }
    memberInfo += "}";
    //把json拼出来
    return memberInfo;
}

function getLogInfo() {
    var timeList = document.getElementsByClassName("logTime");
    var logList = document.getElementsByClassName("logContent");
    var logInfo = "{";
    for(var i=0; i<timeList.length; i++){
        logInfo += "\"";
        logInfo += timeList[i].innerText;
        logInfo += "\":\"";
        logInfo += logList[i].innerText;
        logInfo += "\"";
        if(i != timeList.length - 1){
            logInfo += ",";
        }
    }
    logInfo += "}";
    //把json拼出来
    return logInfo;
}

$(document).ready(function() {
    $(".submitToServer").click(function() {
        alert("hello, ajax")
        $.ajax({
            type: "POST",
            url: "/save",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(getMemberInfo()),
            success: function (message) {
                if (message > 0) {
                    showRule("success", "提交数据成功！");
                }
            },
            error: function (message) {
                showRule("fail", "提交数据失败！");
            }
        });
        alert("bye, ajax");
        return false;
    });
});
