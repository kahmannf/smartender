using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MachineManagerMock
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void buttonStartServer_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(textBoxMachineManagerPort.Text))
            {
                MessageBox.Show("Please enter a Port");
            }
            else if (int.TryParse(textBoxMachineManagerPort.Text, out int port))
            {
                _port = port;
                StartLocalServer();
            }
            else
            {
                MessageBox.Show($"\"{textBoxMachineManagerPort.Text}\" can not be converted into an Int32");
            }
        }

        Thread listenerThread;

        List<string> activeMachines = new List<string>();
        List<string> busyMachines = new List<string>();

        private void StartLocalServer()
        {
            textBoxMachineManagerPort.Enabled = false;
            textBoxWebServerAddress.Enabled = false;

            listenerThread = new Thread(RunServer);
            listenerThread.Start();
        }

        private void StopLocalServer()
        {
            listenerThread.Abort();
            listenerThread = null;

            _running = false;

            textBoxMachineManagerPort.Enabled = true;
            textBoxWebServerAddress.Enabled = true;
        }

        int _port;
        bool _running = false;

        private async void RunServer()
        {
            HttpListener listener = new HttpListener();

            string url = $"http://localhost:{_port}/";

            listener.Prefixes.Add(url);

            listener.Start();

            _running = true;

            while (true)
            {
                HttpListenerContext context = await listener.GetContextAsync();

                string path = context.Request.Url.ToString().Substring(url.Length);

                AppendTextBoxText(textBoxResults, "Incomming " + path);

                if (path.StartsWith("status/"))
                {
                    path = path.Substring(7);

                    AppendTextBoxText(textBoxResults, path);

                    if (activeMachines.Contains(path))
                    {
                        AppendTextBoxText(textBoxResults, "Awnsering for machine: " + path);
                        StreamWriter writer = new StreamWriter(context.Response.OutputStream, Encoding.ASCII);
                        writer.WriteLine("{ \"available\": true, \"busy\": false }");
                        writer.Flush();
                        context.Response.StatusCode = 200;
                        context.Response.Close();
                    }
                    else if (busyMachines.Contains(path))
                    {
                        AppendTextBoxText(textBoxResults, "Awnsering for machine: " + path);
                        StreamWriter writer = new StreamWriter(context.Response.OutputStream, Encoding.ASCII);
                        writer.WriteLine("{ \"available\": true, \"busy\": true }");
                        writer.Flush();
                        context.Response.StatusCode = 200;
                        context.Response.Close();
                    }
                    else
                    {
                        StreamWriter writer = new StreamWriter(context.Response.OutputStream, Encoding.ASCII);
                        writer.WriteLine("{ \"available\": false, \"busy\": false }");
                        writer.Flush();
                        context.Response.StatusCode = 200;
                        context.Response.Close();
                    }
                }
                else
                {
                    context.Response.StatusCode = 400;
                    context.Response.Close();
                }
            }
        }

        private void AppendTextBoxText(TextBox box, string text)
        {
            if (box.InvokeRequired)
            {
                box.BeginInvoke((MethodInvoker)delegate () { box.Text += Environment.NewLine + text; });
            }
            else
            {
                box.Text = text;
            }
        }

        HttpClient client = new HttpClient();

        private void buttonReportMachine_Click(object sender, EventArgs e)
        {
            if (!listBoxActiveMachines.Items.Contains(textBoxReportMachine.Text))
            {
                listBoxActiveMachines.Items.Add(textBoxReportMachine.Text);
                activeMachines.Add(textBoxReportMachine.Text);
                ReportMachine(textBoxReportMachine.Text);
            }

            textBoxReportMachine.Text = string.Empty;
        }

        private void buttonRemoveMachine_Click(object sender, EventArgs e)
        {
            if (listBoxActiveMachines.SelectedItem != null)
            {
                string item = listBoxActiveMachines.SelectedItem as string;
                listBoxActiveMachines.Items.Remove(listBoxActiveMachines.SelectedItem);
                activeMachines.Remove(item);
                ReportMachine(item);
            }
        }

        private async void ReportMachine(string machinekey)
        {
            string url = textBoxWebServerAddress.Text;

            if (!url.EndsWith("/"))
            {
                url += "/";
            }

            url += "machine_service/report/" + machinekey;

            HttpContent content = new FormUrlEncodedContent(new Dictionary<string, string>());

            HttpResponseMessage message = await client.PostAsync(url, content);
            
        }

        private void buttonClearResults_Click(object sender, EventArgs e)
        {
            textBoxResults.Text = string.Empty;
        }

        private void buttonMoveToBusy_Click(object sender, EventArgs e)
        {
            if (listBoxActiveMachines.SelectedItem != null)
            {
                string item = listBoxActiveMachines.SelectedItem as string;
                activeMachines.Remove(item);
                listBoxActiveMachines.Items.Remove(item);

                busyMachines.Add(item);
                listBoxBusy.Items.Add(item);

                ReportMachine(item);
            }
        }

        private void buttonMoveToActive_Click(object sender, EventArgs e)
        {
            if (listBoxBusy.SelectedItem != null)
            {
                string item = listBoxBusy.SelectedItem as string;
                busyMachines.Remove(item);
                listBoxBusy.Items.Remove(item);

                activeMachines.Add(item);
                listBoxActiveMachines.Items.Add(item);

                ReportMachine(item);
            }
        }
    }
}
