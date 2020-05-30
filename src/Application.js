import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start(context) {
    context.port = 21137;
    context.project.name = "Ditto Online";
    context.project.color = "";
    context.project.domain = "ditto.codase.com.br";
    const {echo} = await import('./echo');
    echo(context.server);
  }

  room = "";
  command = "";
  socket = null;
  shortcuts = [];
  executing = false;

  initiate({environment, page}) {
    page.title = "Ditto Server";
    if(environment.client) {
      this.connect();
      if(localStorage['shortcuts']) {
        this.shortcuts = JSON.parse(localStorage['shortcuts']);
      }
    }
  }

  connect() {
    this.socket = new WebSocket("wss://" + location.host, "protocolOne");
    this.socket.onclose = () => setTimeout(this.connect, 1000);
    this.socket.onerror = () => this.socket.close();
  }

  remove({shortcut}) {
    this.shortcuts = this.shortcuts.filter((s) => s != shortcut);
    localStorage['shortcuts'] = JSON.stringify(this.shortcuts);
  }

  execute({shortcut}) {
    if(this.executing) return;
    if(!shortcut) {
      if(!this.room || !this.command) return;
      shortcut = this.room + ' ' + this.command;
    }
    this.socket.send(shortcut);
    if(!this.shortcuts.includes(shortcut)) {
      this.shortcuts.push(shortcut);
      localStorage['shortcuts'] = JSON.stringify(this.shortcuts);
    }
    this.room = '';
    this.command = '';
    this.executing = true;
    setTimeout(() => this.executing = false, 500);
  }

  renderShortcut({shortcut}) {
    return (
      <div class="xl m2b bg1 p4x p2y">
        <div class="xl x6 yy"> {shortcut} </div>
        <div class="xr x6 yy">
          <button class="xx x0 c0 bg3 p2x p1y m1r" onclick={this.remove} shortcut={shortcut} disabled={this.executing}> x </button>
          <button class="xx x0 c0 bg3 p2x p1y" onclick={this.execute} shortcut={shortcut} disabled={this.executing}> Execute </button>
        </div>
      </div>
    )
  }

  render({page}) {
    return (
      <main class="xx bg1">
        <div class="xxx yy y12 p4x">
          <form class="xx bg0 md+x6 s1" onsubmit={this.execute}>
            <h1 class="xx p3y bc1b c3"> {page.title} </h1>
            <div class="xx p4">
              <input bind="room" placeholder="room" class="bc1 p4 m2b" />
              <input bind="command" placeholder="command" class="bc1 p4 m2b" />
              <button class="xx bg3 c0 p4" disabled={this.executing}> Execute </button>
            </div>
            {this.shortcuts.length > 0 &&
              <div class="xx p4x p4t p2b bc1t">
                {this.shortcuts.map((shortcut) => <Shortcut shortcut={shortcut} />)}
              </div>
            }
          </form>
        </div>
      </main>
    )
  }


}

export default Application;