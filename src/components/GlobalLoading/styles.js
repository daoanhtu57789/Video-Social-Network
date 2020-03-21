const styles = (theme) =>({
    loading: {
        //cho lên trên bên trái với thằng cha
        position : "fixed",
        //chỉnh cho nó với thẻ body
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        //cho hiển thị trên cùng
        zIndex: 99,
        //làm mờ
        background : 'rgba(0,0,0,0.3)'
    },
    icon : {
        //cho icon nhỏ đi
        width : "100px",
        position : "fixed",
        left : 0,
        right : 0,
        //cho ra giữa mà hình
        marginLeft:"auto",
        marginRight:"auto",
        top:"40%"
    }
});

export default styles;