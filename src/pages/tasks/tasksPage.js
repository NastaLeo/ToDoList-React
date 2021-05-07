import TaskList from '../../components/taskList/taskList.js';

import './tasksPage.scss';


export const TasksPage = () => {

    //const commonArr = tasksStore.unimportant.concat(tasksStore.important, tasksStore.urgent);
   
    return(
            <div className="page">
                <h1> Your ToDo List</h1>

                <div className='page-main'>

                    <div className="page-main-col">
                        <div className="page-main-col-unimportant">
                            Unimportant tasks:
                        </div>    
                        <TaskList taskType = 'unimportant'/>
                    </div> 
                
                    <div className="page-main-col">
                        <div className="page-main-col-important">
                            Important tasks:
                        </div>
                        <TaskList taskType = 'important'/>
                    </div>

                    <div className="page-main-col">
                        <div className="page-main-col-urgent">
                            Very important tasks:
                        </div>
                        <TaskList taskType = 'urgent'/>
                    </div>
                
                </div>

                {/* <div className="page-statistics">

                    {commonArr.length > 0 && 
                    <div>Your statistics: you have {commonArr.filter(el => el.checked === false).length}  not completed tasks</div>
                    }
                
                </div> */}
                
            </div>
    )
}