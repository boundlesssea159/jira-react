import {Input, Row} from "antd";
import {UserSelect} from "../../component/user-select";
import {useUrlQueryParams} from "../../utils/use-url";


export const SearchPanel = () => {
    const [urlParams, setUrlParams] = useUrlQueryParams(['name', 'processorId'])
    return <Row justify={"start"} wrap={false} style={{maxWidth: '30rem', marginBottom: '2rem'}}>
        <Input placeholder={'任务名称'} onChange={(event) => setUrlParams({...urlParams, 'name': event.target.value})}/>
        <UserSelect onChange={(value) => {
            setUrlParams({...urlParams, 'processorId': value})
        }}/>
    </Row>
}