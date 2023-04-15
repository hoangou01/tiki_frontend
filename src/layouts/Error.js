const setErr = (err)=>{
    var renderErr = (
        <>
          <div className="text-danger" style={{ marginTop: '-20px' }}>{err}</div>
        </>
      )
      if (err == '') {
        renderErr = (
          <>
            <div className="d-none text-danger">{err}</div>
          </>
        )
      }
      return(
        <>
            {renderErr}
        </>
      )
}
export default setErr