describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should create a row with server and their earnings', function () {
    submitServerInfo();
    updateServerTable();
    let rowname = serverTbody.firstChild.firstChild.innerText;
    let rowearn = serverTbody.firstChild.lastChild.innerText;

    expect(rowname).toEqual('Alice');
    expect(rowearn).toEqual('$0.00');

  })

  afterEach(function() {
    // teardown logic
    /* serverNameInput.value = '';
    delete allServers['server' + serverId];
    document.getElementById('server' + serverId).remove();
    console.log(serverTbody.firstChild.firstChild.innerText);
    serverTbody.innerHTML = ''; */

    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});
