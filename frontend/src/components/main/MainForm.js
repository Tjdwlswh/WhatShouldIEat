import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const StyleImgBox = styled.div`
    flex : 0 0 auto;
    width: 41.66667%;
    display : block;
    box-sizing : border-box;
    padding-right: 1rem;
    padding-left : 1rem;
    order: 1 ; 
    cursor: pointer;
    a{
       color : black;
       display: block;
    }
    img{
        width: 100%;
        height: auto;
        vertical-align: middle; 
          
    }
    img:hover{     
        transition: transform 0.4s ease;
        transform : translateY(-3rem); 
    }
`

const StyleForm = styled.div`
    text-align : left ;
    padding-top : 7.5rem;
    padding-bottom : 7.5rem;
    flex : 0 0 auto;
    width:58.33333%;
    display: block;
    box-sizing: border-box;
    .logo{
        font-size: 1.88832rem;
        color : #F9FAFD;
        font-weight: 900;
        line-height: 1;
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-family: "Source Sans Pro","Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";

    }
    .description{
        color: #616161;
        font-size:1.5736rem;
        margin-top: 0;
        margin-bottom: 3rem;
        font-weight: 700;
        line-height: 1.2;
        font-family: "Source Sans Pro","Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    }
`;

const WhiteBlock = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #FFFEFE;
    background-clip: border-box;
    border : 1px solid rgba(0,0,0,0.125);
    border-radius:0.5rem;
    text-align: center;
    box-sizing: border-box;
    .card_body{
        flex:1 1 auto;
        padding : 1rem 1rem;
    }
    .nav_tabs{
        border-bottom: 1px solid #eee;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    button{
        font-family: "Source Sans Pro","Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        cursor: pointer;
        text-transform: none;
        margin-bottom: 1rem;
        font-size: 10px;
        line-height: inherit;
        border-top-left-radius:0.5rem;
        border-top-right-radius:0.5rem; 
        border: 1px solid transparent;
        outline: 0;
        width: 4rem;
        height: 1.5rem;
        .nav_link{
            background: none;
            border:1px solid transparent;
            display: block;
            padding: 0.5rem 1rem;
            color:#757575;
            transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out;
            isolation: isolate;        
        }
        .active{
         color: #F17228;
         background-color: rgba(241,114,40,0.15);
         border-color: rgba(0,0,0,0);
         //버튼이 눌리면 active 클래스가 붙여지는 상태를 만들어줘야함    
        }
    }
`

//버튼이 눌리면 active 클래스가 붙여지는 상태를 만들어줘야함

const MainForm = () => {
    return(
        <>
            <StyleImgBox>
                <a href="#!">
                    <img src="img/hero-header.png" alt="hero-header" />
                </a>
            </StyleImgBox>
            <StyleForm>
                <h1 className='logo'>
                    Are you starving?
                </h1>
                <h1 className='description'>
                    Within a few clicks, find meals that
                    <br></br>
                    are accessible near you
                </h1>
                <WhiteBlock>
                    <div className='card_body' >
                        <nav>
                            <div className='nav_tabs'>
                                <button className='nav_link active'>
                                    Delivery
                                </button>
                                <button className='nav_link'>
                                    Pickup
                                </button>
                            </div>
                        </nav>
                        <div></div>
                    </div>
                </WhiteBlock>
            </StyleForm>
        </>
    )
}

export default MainForm
