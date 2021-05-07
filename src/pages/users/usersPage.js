import './usersPage.scss'

export const UsersPage = () => {


    const usersArr =[
        {name:'Ivan', age: 20},
        {name:'In', age: 2650},
        {name:'Ian', age: 460},
        {name:'In', age: 25460},
    ]



    return (

        <div className="users">

            <div className="users-wrapper">

            <h2>Active users</h2>

            <input placeholder="Search"/>

            {usersArr.length > 0 && usersArr.map((user, index) => {
                return(
                    <div className="user"
                         key={index}>{user.name}</div>
                )
            })}

            </div>

        </div>
        
    )

}